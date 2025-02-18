import express from 'express';
import { protectedRoute } from '../middlewares/protected.middleware.js';
import restrictedTo from '../middlewares/restrictedTo.middleware.js';
import upload from '../controllers/multer.middleware.js';
import {
  addSubCategory,
  deleteSubCategory,
  fetchSubCategories,
  updateSubCategory,
} from '../controllers/subcategory.controller.js';

const subCategoryRoute = express.Router();

//subCategoryRoutes
subCategoryRoute
  .route('/add-subcategory')
  .post(
    protectedRoute,
    restrictedTo('admin'),
    upload.single('image'),
    addSubCategory
  );
subCategoryRoute
  .route('/')
  .get( fetchSubCategories);
subCategoryRoute
  .route('/:subcategoryId')
  .put(
    protectedRoute,
    restrictedTo('admin'),
    upload.single('image'),
    updateSubCategory
  );
subCategoryRoute
  .route('/:subcategoryId')
  .delete(protectedRoute, restrictedTo('admin'), deleteSubCategory);

export default subCategoryRoute;
