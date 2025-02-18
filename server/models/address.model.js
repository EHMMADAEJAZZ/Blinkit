import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    addressLine: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100
    },
    city: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    state: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    country: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    pincode: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 6
    },
    mobile:{
        type: String,
        required: true,
        default: null
    },
    status:{
        type: Boolean,
        default: true
    },
    isDefault:{
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

},{timestamps:true})

const Address = mongoose.model('Address', addressSchema);

export default Address;