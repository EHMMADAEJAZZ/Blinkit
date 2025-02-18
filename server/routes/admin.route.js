import express from 'express';
import { protectedRoute } from '../middlewares/protected.middleware.js';
import restrictedTo from '../middlewares/restrictedTo.middleware.js';
import { AddCategory } from '../controllers/category.controller.js';
import { registerUserByAdmin } from '../controllers/admin.controller.js';
import upload from '../controllers/multer.middleware.js';

const adminRoutes = express.Router();

// Define routes for admin functionality
adminRoutes
  .route('/add-category')
  .post(protectedRoute, restrictedTo('admin'),upload.single('image'), AddCategory);
adminRoutes
.route('/register')
.post(protectedRoute, restrictedTo('admin'),registerUserByAdmin);
export default adminRoutes;
