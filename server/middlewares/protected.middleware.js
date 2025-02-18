import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { ApiErrors} from '../utils/apiErrors.js';

export const protectedRoute = async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken ||
      req.headers?.authorization?.replace('Bearer ', '');
    if (!token) {
      return next(new ApiErrors(401, 'you are not Logged in'));
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    const user = await User.findById(decodedToken?.id).select('-password');
    if (!user) {
      return next(new ApiErrors(404, 'user Not Found'));
    }
    req.user = user;
    next();
  } catch (error) {
    return next(new ApiErrors(error.statusCode,"you are not Logged in" ||error.message));
  }
};
