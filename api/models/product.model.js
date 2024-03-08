import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter Name"],
    },
    photo: {
      type: String,
      required: [true, "Please enter Photo"],
    },
    discountPrice:{
      type: Number,
      required: [true, "Please enter Price"],
    },
    originalPrice:{
      type: Number,
      required: [true, "Please enter Price"],
    },
    discountPercentage:{
      type: Number,
    },
    stock: {
      type: Number,
      required: [true, "Please enter Stock"],
    },
    category: {
      type: String,
      required: [true, "Please enter Category"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);


export const Product = mongoose.model("Product", schema);
export default Product;