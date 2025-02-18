import mongoose from 'mongoose';

const productSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
        lowercase:true,
        trim:true
    },
   
    price: {
        type: Number,
        required: true,
        min: 0
    },
    discount:{
       type:Number,
    //    validate:{
    //      validator: function(value){
    //         return value >= 0 && value <= this.price;
    //      },
    //      message: (props)=>`${props.value} must be between 0 and ${this.price}`
    //    }

    },
    category: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    subcategory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory'
    }],
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    images: {
        type: Array,
        required: true,
        default: []
    },
    stock:{
        type: Number,
        required: true,
        min: 0
    },
    unit:{
        type: String,
        required: true,
         lowercase:true,
        trim:true,
       
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 2000,
         lowercase:true,
        trim:true
    },
    moreDetails: {
    type: Object,
    default: {}
    },
    published:{
        type: Boolean,
        default: false
    }
},{timestamps:true});

productSchema.index({
    name:"text",
    description:"text"

},{
    weights:{
        name: 10,
        description: 5
    }
})
const Product = mongoose.model('Product', productSchema);
export default Product;