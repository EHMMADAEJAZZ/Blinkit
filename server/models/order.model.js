import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
   
    orderId:{
        type: String,
        required: true
    },
    paymentId:{
        type: String,
        required: true
    },
    paymentStatus:{
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending"
    },
    paymentMethod:{
        type: String,
        required: true,
        enum: ["CASH ON DELIVERY", "ONLINE PAYMENT"],
        default: "CASH ON DELIVERY"
    },
    deliveryAddress:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true
    },
 status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
        default: "pending"
    },
    invoiceRecept:{
        type:String,
        required: true
    }
},{timestamps:true})

const Order = mongoose.model("Order", orderSchema);

export default Order;
