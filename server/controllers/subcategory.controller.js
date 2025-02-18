import SubCategory from '../models/subCategory.model.js';
import { ApiErrors } from '../utils/apiErrors.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { deleteOnCloudinary, uploadOnCloudinary } from '../utils/cloudinary.js';
//Add category
export const addSubCategory = async (req, res, next) => {
  try {
    const { name ,category} = req.body;
    const categoryIds = category.split(',')
    const imagePath = req.file?.path;
    if (!categoryIds[0] || !name || !imagePath) {
      return next(new ApiErrors(400, 'All fields are required'));
    }
    const imageUlr = await uploadOnCloudinary(imagePath);
    const subcategory = await SubCategory.create({
      name,
      image: imageUlr.secure_url,
      category:categoryIds
    });
    return res
      .status(201)
      .json(new ApiResponse(201, 'sub category added successfully', subcategory));
  } catch (error) {
    next(error);
  }
};
//fetch subcategories
export const fetchSubCategories=async (req, res, next) => {
    try {
        const subCategory = await SubCategory.find().populate('category');
        if(!subCategory.length){
            return res.status(404).json(new ApiResponse(404, 'No subcategories found'));
        }
        return res.status(200).json(new ApiResponse(200, 'Subcategories fetched successfully', subCategory));
    } catch (error) {
        next(error)
    }
}
//update subcategory
export const updateSubCategory = async (req, res, next) => {
  try {
    const {subcategoryId} = req.params;
    const { name ,category,image} = req.body;
    const categoryIds = category.split(',')
    let imagePath=req.file?.path;
    let imageUrl;
    const subcategory = await SubCategory.findById(subcategoryId);
    if (!subcategory) {
      return next(new ApiErrors(404, 'Subcategory not found'));
    }
    if(imagePath && subcategory){
      imageUrl = await uploadOnCloudinary(imagePath);
      await deleteOnCloudinary(subcategory.image);
    }
    if (!subcategoryId || !name || (!image && !imageUrl)) {
      return next(new ApiErrors(400, 'All fields are required'));
    }
    const updatedsubcategory = await SubCategory.findByIdAndUpdate(subcategoryId, {
      name,
      image: imageUrl? imageUrl.secure_url: image,
      category: categoryIds
    }, {new: true,runValidators:true});
    
    return res.status(200).json(new ApiResponse(200,'subcategory updated successfully',updatedsubcategory))

  } catch (error) {
    next(error);
    
  }
}
//delete subcategory
export const deleteSubCategory = async (req, res, next) => {
  try {
    const { subcategoryId } = req.params;
    const subcategory = await SubCategory.findById(subcategoryId);
    if (!subcategory) {
      return next(new ApiErrors(404, 'Subcategory not found'));
    }
    await deleteOnCloudinary(subcategory.image);
    await SubCategory.findByIdAndDelete(subcategoryId);
    return res.status(200).json(new ApiResponse(200, 'Subcategory deleted successfully'));
  } catch (error) {
    next(error);
  }
};