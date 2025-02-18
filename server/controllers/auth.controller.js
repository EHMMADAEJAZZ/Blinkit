import sendEmail from '../config.js/sendEmail.js';
import User from '../models/user.model.js';
import { ApiErrors } from '../utils/apiErrors.js';
import { ApiResponse } from '../utils/apiResponse.js';
import {  WELCOME_EMAIL_TEMPLATE } from '../utils/EmailTemplates.js';
import generateTokenAndSetCookies from '../utils/generateTokens.js';
import { sendForgotPasswordUrl, verifyUser } from '../utils/verifyUser.js';
import crypto from "crypto"
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, mobile } = req.body;

    // Validate input fields
    if (!name || !email || !password || !mobile) {
      return next(new ApiErrors(400, 'All fields are required'));
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return next(new ApiErrors(400, 'Invalid email format'));
    }

    // Validate password strength
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return next(
        new ApiErrors(
          400,
          'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        )
      );
    }
    // Check if user already exists
    const existingUser = await User.findOne({$or:[{email},{mobile}]  });
    if (existingUser) {
      return next(new ApiErrors(400, 'user already exists with this user name or mobile number'));
    }

    const verficationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    // Create new user

    const user = await User.create({
      name,
      email,
      password,
      mobile,
      verficationToken,
      verificationtokenExpiry: Date.now() + 24 * 60 * 60 * 1000
    });
   

    const verifyUrl =`${process.env.FRONTEND_URL}/verify-email?code=${verficationToken}`
await verifyUser(email,'verify-email',user.name,verifyUrl,res)
    
  } catch (error) {
    return next(new ApiErrors(error.statusCode, error.message));
  }
};


//verify email address

export const verifyEmail = async (req, res, next) => {
  try {
    const { code } = req.query;
    const user = await User.findOne({ verficationToken:code,verificationtokenExpiry:{$gt:Date.now()} });
    if (!user) {
      return next(new ApiErrors(400, 'Invalid  or Expiry code'));
    }

    user.verified = true;
    user.verficationToken = null;
    user.verificationtokenExpiry = null;
    
    await user.save();
    
    await sendEmail(user.email,'welcome',WELCOME_EMAIL_TEMPLATE.replace('{username}',user.name))
    return res.status(200).json(
      new ApiResponse(200, 'Email verified successfully')
    );
  } catch (error) {
    return next(new ApiErrors(error.statusCode, error.message));
  }
};

export const login =  async(req,res,next)=>{
  try {
    const {email,password} = req.body;
    if(!email || !password) {
      return next(new ApiErrors(400,'please fill all required fields'))
    }
    const user = await User.findOne({ email})
    if(!user || !(await user.comparePassword(password))) {
      return next(new ApiErrors(401,'Invalid email or password'))
    }
    if(!user.verified){
      return next(new ApiErrors(403,'Email is not verified'))
    }
    const {accessToken, refreshToken } = await generateTokenAndSetCookies(user._id,res)
    user.lastLogin=new Date()
    await user.save()
    return res.status(200).json(new ApiResponse(200,'login successful',{
      ...user._doc,
      password:undefined,
      accessToken: accessToken,
      refreshToken: refreshToken,
    }))
  } catch (error) {
    return next(error)
  }
}

// logout user and clear cookies
export const logout = async (req, res, next) => {
  try {
    const userid = req.user._id;
    const user = await User.findById(userid);
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
    user.refreshToken=null;
    await user.save()
    return res.status(200).json(new ApiResponse(200, 'Logged out successfully'));
  } catch (error) {
    return next(new ApiErrors(error.statusCode, error.message));
  }
};

//refreshAccessToken
export const refreshAccessToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken || req.headers.authorization.replace('Bearer ','');
    if (!refreshToken) {
      return next(new ApiErrors(401, 'No refresh token provided'));
    }
    const user = await User.findOne({ refreshToken });
    if (!user) {
      return next(new ApiErrors(403, 'Invalid refresh token'));
    }
    const { accessToken} = await generateTokenAndSetCookies(user._id, res);
    user.lastLogin = new Date();
    await user.save();
    return res.status(200).json(new ApiResponse(200, 'Access token refreshed', {
      accessToken: accessToken,
    }));
  } catch (error) {
    return next(new ApiErrors(error.statusCode, error.message));
  }
};

//change login user Password

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword,confirmNewPassword } = req.body;
      if (!currentPassword || !newPassword || !confirmNewPassword) {
      return next(new ApiErrors(400, 'Please fill all required fields'));
    }
      const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return next(
        new ApiErrors(
          400,
          'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        )
      );
    }
    if(newPassword !==confirmNewPassword){
      return next(new ApiErrors(400, 'New password and confirm password must match'))
    }
    const userId = req.user._id;
    const user = await User.findById(userId);
     if(!user){
       return next(new ApiErrors(404, 'User not found'))
     }
     if(!await user.comparePassword(currentPassword)){
       return next(new ApiErrors(400, 'Invalid current password'))
     }
    
     user.password =newPassword;
     await user.save({validateModifiedOnly:true})
     return res.status(200).json(new ApiResponse(200, 'Password changed successfully'))
  } catch (error) {
    next(error)
    
  }
}

//forget password

export const forgetPassword = async (req, res, next) => {
  const {email} = req.body;
  try {
    if(!email){
      return next(new ApiErrors(400, 'Please provide your email'))
    }
    const user = await User.findOne({ email: email});
    if(!user) {
      return next(new ApiErrors(404, 'User not found'))
    }
    if(user && !user.verified) {
      return next(new ApiErrors(400,'User not verified'))
    }
    const token = await user.generateResetPasswordToken();
    await user.save({validateBeforeSave:false});
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`
    await sendForgotPasswordUrl(user.email,'Reset Password Link',user.name,resetUrl,res)
  } catch (error) {
    next(error);
  }
}

//reset password

export const resetPassword = async (req, res, next) => {
  const {token} = req.query;
  const {password,confirmPassword} = req.body;
  try {
    if(!token){
      return next(new ApiErrors(400, 'Token is required'));
    }
    if(!password ||!confirmPassword){
      return next(new ApiErrors(400, 'Password and Confirm Password are required'));
    }
    if(password!== confirmPassword){
      return next(new ApiErrors(400, 'Password and confirm password must match'))
    }
       const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return next(
        new ApiErrors(
          400,
          'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        )
      );
    }
    const resetToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({resetPasswordToken: resetToken, resetPasswordTokenExpiry: {$gt:Date.now()}});
    if(!user){
      return next(new ApiErrors(404, 'Invalid or expired token'))
    }
    
    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordTokenExpiry = null;
    await user.save({validateModifiedOnly:true});
    return res.status(200).json(new ApiResponse(200, 'Password reset successfully'))
  } catch (error) {
    next(error);
  }
}

export const getMe = async(req,res,next)=>{
   try {
    const userId = req.user._id;
    const user = await User.findById(userId).select('-password -refreshToken')
    if(!user){
      return next(new ApiErrors(404, 'User not found'))
    }
    return res.status(200).json(new ApiResponse(200, 'user details fetched successfully',user))
    
   } catch (error) {
    next(error)
    
   }
}