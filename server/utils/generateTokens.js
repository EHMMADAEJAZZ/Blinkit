import User from '../models/user.model.js';
import { ApiErrors } from './apiErrors.js';
import jwt from 'jsonwebtoken';
const generateTokenAndSetCookies = async (userId, res) => {
  try {
    const user = await User.findById(userId);
    //user not found
    if (!user) {
      throw new ApiErrors(404, 'User not found');
    }
    //generate token and set cookies for user authentication and authorization
    //jwt.sign(payload, secretOrPrivateKey, options) returns a token
    //payload: userId
    //secretOrPrivateKey: process.env.ACCESS_TOKEN_SECRET_KEY or process.env.REFRESH_TOKEN_SECRET_KEY
    //options: expiresIn: '15d' or '30d' for access token and refresh token respectively
    //httpOnly: true means the token can only be accessed by the server and not by the client-side JavaScript code
    //expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) means the token will expire in 15 days for access token and 30 days for refresh token respectively
    const accessToken = await jwt.sign(
      {id:userId},
      process.env.ACCESS_TOKEN_SECRET_KEY,
      {
        expiresIn: '15d',
      }
    );
    const refreshToken = jwt.sign(
      {id:userId},
      process.env.REFRESH_TOKEN_SECRET_KEY,
      {
        expiresIn: '30d',
      }
    );
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
    return { accessToken, refreshToken };
  } catch (error) {
    console.error(error);
    throw new ApiErrors(500, 'something went wrong while generating the token');
  }
};

export default generateTokenAndSetCookies;
