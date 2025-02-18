import { Router } from "express";
import { protectedRoute } from '../middlewares/protected.middleware.js';
import { addToCart, deleteCartItem, getCartItems, updateCartItemQuantity } from "../controllers/cart.controller.js";
const cartRoutes = Router();
//routes

cartRoutes
.route("/cart-items")
.get(protectedRoute,getCartItems)
cartRoutes
.route("/add-to-cart/:productId")
.post(protectedRoute,addToCart)
cartRoutes
.route("/update-cart-item-quantity/:cartItemId")
.put(protectedRoute,updateCartItemQuantity)
cartRoutes
.route("/delete-cart-item/:cartItemId")
.delete(protectedRoute,deleteCartItem)

export default cartRoutes;