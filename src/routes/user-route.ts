import express, { Router } from 'express';
const router: Router = express.Router();
import { getAllUsers, getCurrentUser, updateUser } from '../controllers/user-controller';
import authMiddleware from '../middlewares/auth-middleware';

router.use(authMiddleware);
router.get('/', getAllUsers);
router.put('/:id', updateUser)
router.get("/current", getCurrentUser)

export default router;
