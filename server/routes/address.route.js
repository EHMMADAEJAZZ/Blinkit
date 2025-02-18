import { Router } from "express";
import { protectedRoute } from "../middlewares/protected.middleware.js";
import { addAddress, deleteAddress, disableAddress, editAddress, enableAddress, getAddresses, setPrimaryAddress } from "../controllers/address.controller.js";
const addressRoutes = Router();

// Define routes
export default addressRoutes;
addressRoutes
.route('/add-address')
.post(protectedRoute,addAddress)
addressRoutes
.route('/addresses')
.get(protectedRoute,getAddresses)
addressRoutes
.route('/update-address/:addressId')
.put(protectedRoute,editAddress)
addressRoutes
.route('/delete-address/:addressId')
.delete(protectedRoute,deleteAddress)
addressRoutes
.route('/set-primary-address/:addressId')
.put(protectedRoute,setPrimaryAddress)
addressRoutes
.route('/enable-address/:addressId')
.put(protectedRoute,enableAddress)
addressRoutes
.route('/disable-address/:addressId')
.put(protectedRoute,disableAddress)