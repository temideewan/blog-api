import express from 'express';
import validateRegistrationSchema from '../utils/schema/auth-schema/register-user-schema';
import { loginUser, registerNewUser } from '../controllers/auth-controller';
import { catchValidationErrors } from '../middlewares/validation-catch';
import validateLoginSchema from '../utils/schema/auth-schema/login-user-schema';

const router = express.Router();

router.post(
  '/register',
  validateRegistrationSchema,
  catchValidationErrors,
  registerNewUser
);
router.post(
  '/login',
  validateLoginSchema,
  catchValidationErrors,
  loginUser
);

export default router;
