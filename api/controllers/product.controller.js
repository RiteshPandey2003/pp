import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { rm } from "fs";
import {Product} from "../models/product.model.js"


const getProduct = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 20;

  const skip = (page - 1) * pageSize;

  const products = await Product.find().skip(skip).limit(pageSize);

  console.log(products);

  if (!products || products.length === 0) {
    throw new ApiError(404, "Products not found");
  }

  res.json(new ApiResponse(200, products));
});

const postProduct = asyncHandler(async (req, res) => {
  const {
    name,
    discountPercentage,
    discountPrice,
    originalPrice,
    stock,
    category,
    discription,
  } = req.body;
  const photo = req.file;

  if (!photo) {
    throw new ApiError(400, "photo is required");
  }

  if (
    !name ||
    !discountPrice ||
    !stock ||
    !category ||
    !originalPrice ||
    !discountPercentage
  ) {
    rm(photo.path, () => {
      console.log("Deleted");
    });

    throw new ApiError(400, "all feilds are required");
  }
  await Product.create({
    name,
    discountPrice,
    originalPrice,
    discountPercentage,
    stock,
    category: category.toLowerCase(),
    photo: photo.path,
    discription,
  });
  return res.json(new ApiResponse(200, "prduct uploaded  Successfully"));
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new ApiError(404, "not product found");
  }

  rm(product.photo, () => {
    console.log("Product Photo Deleted");
  });

  await product.deleteOne();

  return res.json(new ApiResponse(200, "prduct deleted  Successfully"));
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    discountPrice,
    originalPrice,
    discountPercentage,
    stock,
    category,
  } = req.body;
  const photo = req.file;
  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "no product fround");
  }

  if (photo) {
    rm(product.photo, () => {
      console.log("Old Photo Deleted");
    });
    product.photo = photo.path;
  }

  if (name) product.name = name;
  if (discountPrice) product.discountPrice = discountPrice;
  if (originalPrice) product.originalPrice = originalPrice;
  if (discountPercentage) product.discountPercentage = discountPercentage;
  if (stock) product.stock = stock;
  if (category) product.category = category;

  await product.save();

  return res.json(200, "Product Updated Successfully");
});

const presentCategory = asyncHandler(async (req, res) => {
  try {
    const categoryData = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          totalStock: { $sum: "$stock" },
        },
      },
    ]);

    res.json(new ApiResponse(200, categoryData));
  } catch (error) {
    console.error("Error fetching category data:", error.message);
    throw new ApiError(500, "Internal Server Error");
  }
});

const getProductsByCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryName } = req.params; // Get the category name from the URL parameters

    const products = await Product.find({ category: categoryName });

    res.json(new ApiResponse(200, products));
  } catch (error) {
    console.error("Error fetching products by category:", error.message);
    throw new ApiError(500, "Internal Server Error");
  }
});

const getProductById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const findProduct = await Product.findOne({ _id: id }); // Use _id instead of id

    if (!findProduct) {
      throw new ApiError(404, "No product found");
    }
    res.json(new ApiResponse(200, findProduct));
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Internal Server Error");
  }
});


export {
  postProduct,
  deleteProduct,
  updateProduct,
  getProduct,
  presentCategory,
  getProductsByCategory,
  getProductById,
};
