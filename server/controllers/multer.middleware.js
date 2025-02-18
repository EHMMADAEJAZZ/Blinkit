import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import multer from 'multer';
import fs from 'fs';
const dir = './public';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinaryVercel.js';

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, './public');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'), false);
  }
};

//Production

let upload;
if(process.env.NODE_ENV === 'production'){
  const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Optional: Specify a folder in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif','webp'], // Optional: Restrict file formats
  },
});
   upload = multer({ storage: storage });
}
if(process.env.NODE_ENV === 'development'){
   upload = multer({
  storage: multerStorage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
  fileFilter: fileFilter,
});
}



export default upload;
