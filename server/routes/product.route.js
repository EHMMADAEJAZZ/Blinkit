import express from 'express';
import { protectedRoute } from '../middlewares/protected.middleware.js';
import restrictedTo from '../middlewares/restrictedTo.middleware.js';
import { addProduct, deleteProduct, editProduct, fetchProductByCategoryAndSubcatgory, fetchProductDetails, fetchProducts, fetchProductsByCategory, searchProducts } from '../controllers/product.controller.js';
import upload from '../controllers/multer.middleware.js';
const productRoute = express.Router();

productRoute
.route('/add-product')
.post(protectedRoute,restrictedTo('admin'),upload.array('images'),addProduct);
productRoute
.route('/products')
.get(fetchProducts)
productRoute
.route('/products/category/:categoryId')
.get(fetchProductsByCategory)
productRoute
.route('/products/category/:categoryId/subcategory/:subcategoryId')
.get(fetchProductByCategoryAndSubcatgory)
productRoute
.route('/products/:productId')
.get(fetchProductDetails)
productRoute
.route('/products/:productId')
.put(protectedRoute,restrictedTo('admin'),upload.array('images'),editProduct)
productRoute
.route('/products/:productId')
.delete(protectedRoute,restrictedTo('admin'),deleteProduct)
productRoute
.route('/search-products')
.get(searchProducts)

export default productRoute;