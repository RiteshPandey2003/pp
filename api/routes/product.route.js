import { Router } from "express";
import { singleUpload} from "../middleware/multer.js";
import { getProducts, postProduct, presentCategory } from "../controllers/product.controller.js";

const router = Router();

router.route("/").post(singleUpload, postProduct);
router.route("/getproduct").get(getProducts);
router.route("/getcategory").get(presentCategory);

export default router;
