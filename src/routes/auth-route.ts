import express from 'express';
import validateRegistrationSchema from '../utils/schema/auth-schema/register-user-schema';
import { registerNewUser } from '../controllers/auth-controller';
import { catchValidationErrors } from '../middlewares/validation-catch';

const router = express.Router();

router.post('/login');
router.post(
  '/register',
  validateRegistrationSchema,
  catchValidationErrors,
  registerNewUser
);

export default router;
