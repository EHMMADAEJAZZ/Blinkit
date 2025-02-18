import mongoose from 'mongoose';
import Order from '../models/order.model.js';
import Cart from '../models/cart.model.js';
import User from '../models/user.model.js';
import { ApiErrors } from '../utils/apiErrors.js';
import { ApiResponse } from '../utils/apiResponse.js';
import Stripe from '../config.js/stripe.js';
import discountedPrice from '../utils/priceWithDiscount.js';
// Function to create a new order cashOnDeliveryOrder
export const cashOnDeliveryOrder = async (req, res, next) => {
  try {
    const { cartItems, shippingAddressId, totalAmount } = req.body;
    if (!cartItems || !shippingAddressId || !totalAmount) {
      return next(
        new ApiErrors(
          400,
          'please provide shippingAddress totalAmount and  cartItems'
        )
      );
    }
    const userId =req.user._id
    cartItems?.map(async (product)=>{
         const order = await Order.create({
           customer: userId,
           products: [{
             product: product.productId._id,
             quantity: product.quantity,
           
           }],
           orderId: `ORD-${new mongoose.Types.ObjectId()}`,
           totalAmount: discountedPrice(product.productId.price, product.productId.discount),
           paymentMethod:'CASH ON DELIVERY',
           deliveryAddress: shippingAddressId,
           paymentId: 'null',
           invoiceRecept: 'null',
         })
         //remove items from cartitems from cart model
         await Cart.deleteMany({ userId: req.user._id });
 //add order to user orderHistory and empty user shoppingcart
    await User.findByIdAndUpdate(req.user._id, {
      $push: { orderHistory: order._id},
      $set: { shoppingcart: [] },
    });
    })

   

    res
      .status(201)
      .json(new ApiResponse(201, 'Order placed successfully'));
  } catch (error) {
    next(error);
  }
};
//Function to create a new order onLinePaymentOrderOrder
export const onLinePaymentOrder = async (req, res, next) => {
  try {
    const { cartItems, shippingAddressId, totalAmount } = req.body;
    const userId = req.user._id;

    if (!cartItems || !shippingAddressId || !totalAmount) {
      return next(
        new ApiErrors(
          400,
          'please provide shippingAddress totalAmount and  cartItems'
        )
      );
    }

    // payment with stripe with line_item
    const line_items = cartItems.map((item) => {
      return {
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.productId.name,
            images: item.productId.images,
            metadata:{
              
              productId: item.productId._id,
              quantity:item?.quantity
              
            }
          },
          unit_amount:
            discountedPrice(item.productId.price, item.productId.discount) *
            100, // 100 cents per unit
        },
        quantity: item.quantity,
      };
    });
    const session = await Stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      metadata: {
        name: req.user.name,
        email: req.user.email,
        address: shippingAddressId,
        userId: userId.toString(),
      },
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
     
    });
   

    
    //send email to customer and admin with order details
    //sendEmail(session);  // this will be a function to send email using nodemailer

    //send push notification to admin with new order

    return res.status(200).json(new ApiResponse(200, 'checkout', session));
  } catch (error) {
    next(error);
  }
};

const createProductCheckout=async(lineItems,userId,paymentId,totalAmount,payment_status,addressId)=>{
  //retrieve product details from stripe based on productId in lineItems
try {
    if(lineItems?.data?.length){

    for(let item of lineItems.data){
      const product = await Stripe.products.retrieve(item.price.product);
       //create order with customer,products:[productId,qunatity],orderId,totalamount
       const order = await Order.create({
        customer: userId,
        products: [{
          product: product.metadata.productId,
          quantity: product.metadata.quantity,
        }],
        orderId: `ORD-${new mongoose.Types.ObjectId()}`,
        totalAmount: Number(item.amount_total)/100,
        paymentMethod:'ONLINE PAYMENT',
        deliveryAddress: addressId,
        paymentId:paymentId,
        paymentStatus:payment_status,
        invoiceRecept: 'null',
      });
      //remove items from cartitems from cart model
  await Cart.deleteMany({ userId: userId });

  //add order to user orderHistory and empty user shoppingcart
  await User.findByIdAndUpdate(userId, {
    $push: { orderHistory: order._id },
    $set: { shoppingcart: [] },
  });

    }
  }
} catch (error) {
  throw new Error(error);
  
}

  
}
export const webhookCheckout =async(req,res,next)=>{
  try{
   const signature = req.headers['stripe-signature'];
   const event =  req.body;
   if(event.type === 'checkout.session.completed'){
     
     //add shipping charges stripe.paymentIntents.create
    



     const session = event.data.object;



     const lineItems = await Stripe.checkout.sessions.listLineItems(session.id);
     const userId = session.metadata.userId;
     const addressId = session.metadata.address;
     const paymentId = session.payment_intent
     const totalAmount = session.amount_total;
     const payment_status = session.payment_status;
     await createProductCheckout(lineItems,userId,paymentId,totalAmount,payment_status,addressId);

   }

    res.status(200).json({received:true});
  }catch(error){
    next(error);
  }

}

//get all orders
export const getAllUserOrders = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const orders = await 
      Order.find({ customer: userId })
       .sort({ createdAt: -1 })
       .populate('products.product')
        .populate('deliveryAddress')
    
    if (orders.length < 1) {
      return res.json(new ApiResponse(404, 'No oder found'));
    }
    return res.json(
      new ApiResponse(200, 'orderss fetched successfully',orders)
    );

    
  } catch (error) {
    next(error);
  }
};