import express, {Router} from 'express';
import userRouter from "./user-route";
import authRouter from "./auth-route";

const router: Router = express.Router();

router.use("/users",userRouter)
router.use('/auth',  authRouter)

export default router;
