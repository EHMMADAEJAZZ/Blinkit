import mongoose from "mongoose";

const categorySchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        minlength:2,
        maxlength:50,
        lowercase:true,
    },
    image:{
        type:String,
        required:true
    }
},{timestamps:true})

const Category = mongoose.model("Category",categorySchema);

export default Category;