import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const uploadOnCloudinary = async (localField) => {
  try {
    if (!localField) return null;

    const response = await cloudinary.uploader.upload(localField, {
      resource_type: 'auto',
    });
    fs.unlinkSync(localField);
    return response;
  } catch (error) {
    fs.unlinkSync(localField);
    throw Error(error.message);
  }
};

export const deleteOnCloudinary = async (img) => {
  try {
    if (!img) return null;
    await cloudinary.uploader.destroy(img.split('/').pop().split('.')[0]);
     return true;
  } catch (error) {
     return false;
  }
};
