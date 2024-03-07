import {Router} from "express"
import  {Signin,Signup, logoutUser, Home} from "../controllers/user.controller.js"
import {verifyJWT} from "../middleware/authmiddleware.js"
const router = Router();

router.route("/signup").post(Signup);
router.route("/signin").post(Signin);
router.route("/logout").post(verifyJWT,  logoutUser)
router.route("/home").get(verifyJWT,Home);


export default router;