import User from '../models/user.model.js';
import { ApiErrors } from '../utils/apiErrors.js';
import { verifyUser } from '../utils/verifyUser.js';
export const registerUserByAdmin = async (req, res, next) => {
  try {
    const { name, email, password, mobile, role } = req.body;

    // Validate input fields
    if ((!name || !email || !password || !mobile, role)) {
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
    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      return next(
        new ApiErrors(
          400,
          'user already exists with this user name or mobile number'
        )
      );
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
      role,
      verficationToken,
      verificationtokenExpiry: Date.now() + 24 * 60 * 60 * 1000,
    });

    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?code=${verficationToken}`;
    await verifyUser(email, 'verify-email', user.name, verifyUrl, res);
  } catch (error) {
    return next(new ApiErrors(error.statusCode, error.message));
  }
};
