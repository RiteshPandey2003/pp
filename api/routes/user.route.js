import {Router} from "express"
import  {Signin,Signup, logoutUser, Home} from "../controllers/user.controller.js"
const router = Router();

router.route("/signup").post(Signup);
router.route("/signin").post(Signin);
router.route("/logout").post( logoutUser)
router.route("/home").get(Home);


export default router;