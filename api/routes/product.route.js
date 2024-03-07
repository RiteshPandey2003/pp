import { Router } from "express";
import {
  getProduct,
  postProduct,
  updateProduct,
  deleteProduct,
  presentCategory,
  getProductsByCategory,
  getProductById,
} from "../controllers/product.controller.js"
import { singleUpload } from "../middleware/multer.js";


const router = Router();

router.route("/allproduct").get(getProduct);
router.route("/getcategory").get(presentCategory);
router.route("/postproduct").post(singleUpload, postProduct);
router
  .route("/:id")
  .delete(deleteProduct)
  .put(updateProduct)
  .get(getProductById);
router.route("/category/:categoryName").get(getProductsByCategory);
export default router;
