import Category from '../models/category.model.js';
import Product from '../models/product.model.js';
import SubCategory from '../models/subCategory.model.js';
import { ApiErrors } from '../utils/apiErrors.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { deleteOnCloudinary, uploadOnCloudinary } from '../utils/cloudinary.js';
//Add category
export const AddCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const imagePath = req.file?.path;
    if (!imagePath || !name) {
      return next(new ApiErrors(400, 'All fields are required'));
    }
    let imageUlr;
    if(process.env.NODE_ENV !== 'production') {

       imageUlr = await uploadOnCloudinary(imagePath);
    }
    const category = await Category.create({
      name,
      image:imageUlr? imageUlr.secure_url:imagePath,
    });
    return res
      .status(201)
      .json(new ApiResponse(201, 'category added successfully', category));
  } catch (error) {
    next(error);
  }
};

//fetch All categories
export const FetchCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({}).sort({createdAt:-1})
    return res
      .status(200)
      .json(
        new ApiResponse(200, 'categories fetched successfully', categories)
      );
  } catch (error) {
    next(error);
  }
};

//update category
export const updateCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  const { name, image } = req.body;
  const imagePath = req.file?.path;
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
  if (!name) {
    return next(new ApiErrors(400, 'All fields are required'));
  }
  let imageUlr;
  if (process.env.NODE_ENV !=='production' && req.file?.path) {
    imageUlr = await uploadOnCloudinary(imagePath);
  }

  if (imageUlr && image) {
    await deleteOnCloudinary(image);
  }
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      {
        $set: {
          name,
          image: imageUlr ? imageUlr.secure_url : imagePath || image,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return res
      .status(200)
      .json(
        new ApiResponse(200, 'category updated successfully', updatedCategory)
      );
  } catch (error) {
    next(error);
  }
};

//delete category

export const deleteCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    const subcategory = await SubCategory.find({
      category: {
        $in: [categoryId],
      },
    }).countDocuments();
    const checkProducts = await Product.find({
      category: {
        $in: [categoryId],
      },
    });
    if (subcategory > 0 || checkProducts.length > 0) {
      return next(new ApiErrors(400, 'This category has related subcategories or products'));
    }
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return next(new ApiErrors(404, 'category not found'));
    }
    await deleteOnCloudinary(deletedCategory.image);
    return res
      .status(200)
      .json(
        new ApiResponse(200, 'category deleted successfully', deletedCategory)
      );
  } catch (error) {
    next(error);
  }
};
