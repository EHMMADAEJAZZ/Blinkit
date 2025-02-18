import { Router } from "express";
import { protectedRoute } from "../middlewares/protected.middleware.js";
import { cashOnDeliveryOrder, getAllUserOrders, onLinePaymentOrder, webhookCheckout } from "../controllers/order.controller.js";

const orderRoutes = Router();

// Add your routes here
orderRoutes
.route('/place-order-cash-on-delivery')
.post(protectedRoute,cashOnDeliveryOrder)
orderRoutes
.route('/checkout')
.post(protectedRoute,onLinePaymentOrder)
orderRoutes
.route('/webhook')
.post(webhookCheckout)
orderRoutes
.route('/orders/user')
.get(protectedRoute,getAllUserOrders)

orderRoutes.get("/orders/:id", protectedRoute, (req, res) => {
  res.json({ message: `Get order with ID: ${req.params.id}` });
});

export default orderRoutes;