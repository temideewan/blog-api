import express, { Router } from 'express';
const router: Router = express.Router();
import { getAllUsers, getCurrentUser } from '../controllers/user-controller';
import authMiddleware from '../middlewares/auth-middleware';

router.get('/', getAllUsers);
router.get("/current", authMiddleware, getCurrentUser)

export default router;
