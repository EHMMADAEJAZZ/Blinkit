import express from 'express';
import { protectedRoute } from '../middlewares/protected.middleware.js';
import restrictedTo from '../middlewares/restrictedTo.middleware.js';
import {
  AddCategory,
  deleteCategory,
  FetchCategories,
  updateCategory,
} from '../controllers/category.controller.js';
import upload from '../controllers/multer.middleware.js';

const categoryRoutes = express.Router();

// Define routes for admin functionality
categoryRoutes
  .route('/add-category')
  .post(
    protectedRoute,
    restrictedTo('admin'),
    upload.single('image'),
    AddCategory
  );
categoryRoutes
  .route('/categories')
  .get( FetchCategories);
categoryRoutes
  .route('/categories/:categoryId')
  .put(protectedRoute, restrictedTo('admin'),upload.single('image'), updateCategory);
  categoryRoutes
  .route('/categories/:categoryId')
  .delete(protectedRoute, restrictedTo('admin'), deleteCategory);
export default categoryRoutes;
