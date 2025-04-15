import express, {Router} from 'express';
import userRouter from "./user-route";
import authRouter from "./auth-route";
import blogRouter from "./blog-route";

const router: Router = express.Router();

router.use("/users",userRouter)
router.use('/auth',  authRouter)
router.use("/blogs", blogRouter)

export default router;
