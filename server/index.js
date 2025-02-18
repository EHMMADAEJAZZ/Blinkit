import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import rateLimit from "express-rate-limit";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import { ApiResponse } from './utils/apiResponse.js';
import { ApiErrors } from './utils/apiErrors.js';
import gloalErrorMiddleware from './middlewares/globalerror.middleware.js';
import connectDB from './config.js/configDB.js';
const app = express();
const PORT = process.env.PORT || 5000;
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE', 'OPTIONS'],
  })
);

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(morgan('dev'));

// Set up routes
// import routes from

import userRoute from './routes/user.route.js';
import adminRoute from './routes/admin.route.js';
import categoryRoute from './routes/category.route.js';
import subCategoryRoute from './routes/subCategory.route.js';
import productRoute from './routes/product.route.js';
import cartRoute from './routes/cart.route.js';
import addressRoute from './routes/address.route.js';
import orderRoute from './routes/order.route.js';
import deletedNotVerifiedUsers from './automation/deleteNotVerifiedUsers.js';
app.get('/api/v1/home', (req, res) => {
  res.status(200).json(new ApiResponse(200, 'fetched successfully'));
});
app.use(globalLimiter); 

app.use('/api/v1/user', userRoute);
app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/subcategory', subCategoryRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/cart', cartRoute);
app.use('/api/v1/address', addressRoute);
app.use('/api/v1/order', orderRoute);

app.use('*', (req, res, next) => {
  next(new ApiErrors(404, `PAGE NOT FOUND FOR ${req.originalUrl}`));
});
await deletedNotVerifiedUsers();
app.use(gloalErrorMiddleware);
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`); // Server is running on port 5000.
    });
  })
  .catch((err) => {
    console.log(`ERROR CONNECTING: ${err}`);
  });
