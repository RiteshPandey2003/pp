import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Product from "../models/product.model.js";
import {rm} from "fs"

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


const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  if (!products || products.length === 0) {
    throw new ApiError(404, 'Products not found');
  }

  res.json(new ApiResponse(200, products));
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

export { postProduct, getProducts, presentCategory };

