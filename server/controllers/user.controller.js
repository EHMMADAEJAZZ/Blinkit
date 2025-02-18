import User from '../models/user.model.js';
import { ApiErrors } from '../utils/apiErrors.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { deleteOnCloudinary, uploadOnCloudinary } from '../utils/cloudinary.js';

//upload avatar image

export const uploadAvatar = async (req, res, next) => {
  try {
    const avatarPath = req.file?.path;
    if (!avatarPath) {
      return next(new ApiErrors(400, 'Avator not found'));
    }
    const userId = req.user._id;
    let avatarUlr
    
    if(process.env.NODE_ENV !== 'production' && avatarPath) {
       avatarUlr = await uploadOnCloudinary(avatarPath);
      if (req.user.avatar) {
        await deleteOnCloudinary(req.user.avatar);
      }
    }
    if (avatarPath && req.user.avatar) {
        await deleteOnCloudinary(req.user.avatar);
      }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { avatar: avatarUlr ? avatarUlr.secure_url : avatarPath } },
      { new: true }
    );
    return res
      .status(200)
      .json(new ApiResponse(200, 'Profile uploaded successfully',updatedUser));
  } catch (error) {
    next(error);
  }
};

//update user

export const updateUser = async (req, res, next) => {
  const { name, email, mobile } = req.body;
  try {
    if (req.body.password) {
      return next(new ApiErrors(400, 'this route is not for password change'));
    }
    if (!name && !email && !mobile) {
      return next(
        new ApiErrors(
          400,
          'PLease provide at least one field to update: name , email or mobile'
        )
      );
    }
   
    const userId = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          name: name || req.user.name,
          email: email || req.user.email,
          mobile: mobile || req.user.email,
        },
      },
      { new: true,runValidators: true }
    );
    return res
      .status(200)
      .json(new ApiResponse(200, 'user updated successfully', updatedUser));
  } catch (error) {
    next(error);
  }
};
