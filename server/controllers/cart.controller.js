import User from '../models/user.model.js';
import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';
import { ApiErrors } from '../utils/apiErrors.js';
import { ApiResponse } from '../utils/apiResponse.js';
import mongoose from 'mongoose';
//add to cart
export const  addToCart = async (req, res, next) => {
  const { productId } = req.params;
  const userId = req.user._id;
  try {
    if (!productId || !userId) {
      return next(new ApiErrors('Invalid product or user', 400));
    }
    // Get product
    const product = await Product.findById(productId);
    if (!product) {
      return next(new ApiErrors('Product not found', 404));
    }
    // Check if user already has this product in their cart
    const existingCartItem = await Cart.findOne({
      userId: userId,
      productId: productId,
    });
    if (existingCartItem) {
      return next(new ApiErrors(400, 'Product already exists in cart'));
    }
    // Create a new cart item
    //productId to string
    
   
    const cart = await Cart.create({
      userId: userId,
      productId: productId,
      quantity: 1,
    });
    //add cart item to user collection shoppingcart
    await User.findByIdAndUpdate(
      userId,
      { $push: { shoppingcart: cart._id } },
      { new: true }
    );
    res.status(200).json(new ApiResponse(true, 'Product added to cart', cart));
  } catch (error) {
    next(error);
  }
};

//get cart items
export const getCartItems = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const cartItems = await Cart.find({ userId: userId }).populate('productId');
    if(!cartItems.length){
        return res.status(200).json(new ApiResponse(200,'Cart is empty',[]));
    }
    res.status(200).json(new ApiResponse(true, 'Cart items fetched', cartItems));
  } catch (error) {
    next(error);
  }
};
//update cartitem quantity
export const updateCartItemQuantity = async (req, res, next) => {
  const {quantity } = req.body;
  const {cartItemId} = req.params;
  const userId = req.user._id;
  try {
    if (!cartItemId || !userId || quantity <= 0) {
      return next(new ApiErrors('Invalid product or user or quantity', 400));
    }
    const cartItem = await Cart.findOneAndUpdate(
      { userId: userId, _id: cartItemId },
      { quantity: quantity },
      { new: true }
    ).populate('productId');
    if (!cartItem) {
      return next(new ApiErrors('Cart item not found', 404));
    }
    res.status(200).json(new ApiResponse(true, 'Cart item quantity updated', cartItem));
  } catch (error) {
    next(error);
  }
};
//delete cart item
export const deleteCartItem = async (req, res, next) => {
  const { cartItemId } = req.params;
  const userId = req.user._id;
  try {
    if (!cartItemId || !userId) {
      return next(new ApiErrors('Invalid product or user', 400));
    }
    const cartItem = await Cart.findOneAndDelete({ userId: userId, _id: cartItemId });
    if (!cartItem) {
      return next(new ApiErrors('Cart item not found', 404));
    }
    //remove cart item from user collection shoppingcart
    await User.findByIdAndUpdate(
      userId,
      { $pull: { shoppingcart: cartItemId } },
      { new: true }
    );
    res.status(200).json(new ApiResponse(true, 'Cart item deleted', cartItem));
  } catch (error) {
    next(error);
  }
}