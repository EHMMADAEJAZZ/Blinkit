import Product from '../models/product.model.js';
import { uploadOnCloudinary, deleteOnCloudinary } from '../utils/cloudinary.js';
import { ApiErrors } from '../utils/apiErrors.js';
import { ApiResponse } from '../utils/apiResponse.js';
//add product
export const addProduct = async (req, res, next) => {
  try {
    const {
      name,
      price,
      discount,
      category,
      subcategory,
      quantity,
      description,
      stock,
      published,
      moreDetails,
      unit,
    } = req.body;

    const images = req.files;
    if (
      !name ||
      !price ||
      !description ||
      !category ||
      !subcategory ||
      !quantity ||
      !description ||
      !stock ||
      !published ||
      !discount ||
      !unit
    ) {
      return next(
        new ApiErrors(400, 'All fields must be specified and not empty')
      );
    }
    let uploadedImages;
    if (process.env.NODE_ENV !== 'production') {
      uploadedImages = await Promise.all(
        images.map(async (image) => {
          const img = await uploadOnCloudinary(image.path);
          return img.secure_url;
        })
      );
    }
    uploadedImages = images.map((image) => {
      return image.path;
    });

    const product = await Product.create({
      name,
      price,
      discount,
      category,
      subcategory,
      quantity,
      description,
      stock,
      published,
      unit,
      images: uploadedImages,
      moreDetails: moreDetails ? JSON.parse(moreDetails) : null,
    });
    return res
      .status(201)
      .json(new ApiResponse(201, 'product added successfully', product));
  } catch (error) {
    next(error);
  }
};

//fetch products
export const fetchProducts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = 'createdAt',
      order = 'desc',
      search,
    } = req.query;
    const query = search
      ? {
          $text: {
            $search: search,
          },
        }
      : {};

    const skipDocuments = (page - 1) * limit;
    const [data, totalDocuments] = await Promise.all([
      Product.find(query)
        .sort({ createdAt: -1 })
        .skip(skipDocuments)
        .limit(limit)
        .populate('category')
        .populate('subcategory'),
      Product.countDocuments(query),
    ]);
    if (data.length < 1) {
      return res.json(new ApiResponse(404, 'No products found'));
    }
    return res.json(
      new ApiResponse(200, 'products fetched successfully', {
        data,
        totalDocuments,
      })
    );
  } catch (error) {
    next(error);
  }
};
//fetch products by category
export const fetchProductsByCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    if (!categoryId) {
      return next(new ApiErrors(400, 'Invalid category ID'));
    }
    const {
      page = 1,
      limit = 20,
      sort = 'createdAt',
      order = 'desc',
      search,
    } = req.query;

    const skipDocuments = (page - 1) * limit;
    const [data, totalDocuments] = await Promise.all([
      Product.find({
        category: {
          $in: categoryId,
        },
        published: true,
      })
        .sort({ createdAt: -1 })
        .skip(skipDocuments)
        .limit(limit)
        .populate('category')
        .populate('subcategory'),
      Product.countDocuments({
        category: {
          $in: categoryId,
        },
        published: true,
      }),
    ]);
    return res.status(200).json(
      new ApiResponse(200, 'category fetched successfully', {
        data: data,
        totalDocuments: totalDocuments,
      })
    );
  } catch (error) {
    next(error);
  }
};

///fetch product by category and subcatgory

export const fetchProductByCategoryAndSubcatgory = async (req, res, next) => {
  const { categoryId, subcategoryId } = req.params;
  try {
    if (!categoryId || !subcategoryId) {
      return next(new ApiErrors(400, 'Invalid category or subcategory ID'));
    }
    const {
      page = 1,
      limit = 20,
      sort = 'createdAt',
      order = 'desc',
      search,
    } = req.query;
    const query = {
      category: { $in: categoryId },
      subcategory: { $in: subcategoryId },
      published: true,
    };
    const skipDocuments = (page - 1) * limit;
    const [data, totalDocuments] = await Promise.all([
      Product.find(query)
        .sort({ createdAt: -1 })
        .skip(skipDocuments)
        .limit(limit)
        .populate('category')
        .populate('subcategory'),
      Product.countDocuments(query),
    ]);
    return res.status(200).json(
      new ApiResponse(200, 'product fetched successfully', {
        data: data,
        totalDocuments: totalDocuments,
      })
    );
  } catch (error) {}
};
//fetch products by id
export const fetchProductDetails = async (req, res, next) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return next(new ApiErrors(400, 'Invalid product ID'));
    }
    const product = await Product.findById(productId)
      .populate('category')
      .populate('subcategory');

    if (!product) {
      return res.status(404).json(new ApiResponse(404, 'Product not found'));
    }
    return res.json(
      new ApiResponse(200, 'Product fetched successfully', product)
    );
  } catch (error) {
    next(error);
  }
};
//Edit Product
export const editProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const {
      name,
      price,
      discount,
      category,
      subcategory,
      quantity,
      description,
      stock,
      published,
      moreDetails,
      unit,
      images,
    } = req.body;

    const newImages = req.files;
    if (
      !name ||
      !price ||
      !description ||
      !category ||
      !subcategory ||
      !quantity ||
      !description ||
      !stock ||
      !published ||
      !discount ||
      !unit
    ) {
      return next(
        new ApiErrors(400, 'All fields must be specified and not empty')
      );
    }
    const product = await Product.findById(productId);

    if (newImages.length > 0) {
      const deletedImages = product.images.filter((image) =>
        newImages.includes(image)
      );
      //get not deleted images
      const notDeletedImages = product.images.filter(
        (image) => !newImages.includes(image)
      );
      product.images = notDeletedImages;
      await Promise.all(
        deletedImages.map(async (image) => {
          await deleteOnCloudinary(image);
        })
      );
      //upload new images to cloudinary
      if (process.env.NODE_ENV !== 'production') {
        await Promise.all(
          newImages.map(async (image) => {
            const img = await uploadOnCloudinary(image.path);
            product.images.push(img.secure_url);
          })
        );
      } else {
        newImages.map(async (image) => {
          product.images.push(image.path);
        });
      }
    } else {
      product.images = images;
    }

    const newProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $set: {
          name,
          price,
          discount,
          category,
          subcategory,
          quantity,
          description,
          stock,
          published,
          unit,
          images: newImages?.length > 0 ? product.images : req.body.images,
          moreDetails: moreDetails ? JSON.parse(moreDetails) : null,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return res
      .status(201)
      .json(new ApiResponse(201, 'product updated successfully', newProduct));
  } catch (error) {
    next(error);
  }
};

//delete product
export const deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return next(new ApiErrors(400, 'Invalid product ID'));
    }
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json(new ApiResponse(404, 'Product not found'));
    }
    const deletedImages = product.images;
    await Promise.all(
      deletedImages.map(async (image) => {
        await deleteOnCloudinary(image);
      })
    );
    return res
      .status(200)
      .json(new ApiResponse(200, 'Product deleted successfully'));
  } catch (error) {
    next(error);
  }
};

//search products with pagenation limit
export const searchProducts = async (req, res, next) => {
  try {
    const { search = '', page = 1, limit = 10 } = req.query;
    const query = search
      ? {
          $text: {
            $search: search,
          },
        }
      : {};
    const skipDocuments = (page - 1) * limit;
    const [data, totalDocuments] = await Promise.all([
      Product.find(query)
        .sort({ createdAt: -1 })
        .skip(skipDocuments)
        .limit(limit)
        .populate('category')
        .populate('subcategory'),
      Product.countDocuments(query),
    ]);
    if (data.length < 1) {
      return res.json(new ApiResponse(404, 'No products found'));
    }
    return res.status(200).json(
      new ApiResponse(200, 'product fetched successfully', {
        data: data,
        totalDocuments: totalDocuments,
      })
    );
  } catch (error) {
    next(error);
  }
};
