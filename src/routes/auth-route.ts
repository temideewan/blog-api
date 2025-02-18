import express from 'express';
import validateRegistrationSchema from '../utils/schema/auth-schema/register-user-schema';
import {
  checkStatus,
  loginUser,
  logoutUser,
  registerNewUser,
  requestPasswordResetToken,
} from '../controllers/auth-controller';
import { catchValidationErrors } from '../middlewares/validation-catch';
import validateLoginSchema from '../utils/schema/auth-schema/login-user-schema';
import authMiddleware from '../middlewares/auth-middleware';
import passwordRequestChangeSchema from '../utils/schema/password-token-request-schema';

const router = express.Router();

router.post(
  '/register',
  validateRegistrationSchema,
  catchValidationErrors,
  registerNewUser
);
router.post('/login', validateLoginSchema, catchValidationErrors, loginUser);

router.post('/logout', authMiddleware, logoutUser);
router.post(
  '/reset-request',
  passwordRequestChangeSchema,
  catchValidationErrors,
  requestPasswordResetToken
);
router.get('/check-status', authMiddleware, checkStatus);

export default router;
