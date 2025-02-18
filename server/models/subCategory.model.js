import mongoose from "mongoose";

const subCategorySchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }],
    image:{
        type: String,
        default: "https://via.placeholder.com/150x150"
    }
},{timestamps:true})

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

export default SubCategory;