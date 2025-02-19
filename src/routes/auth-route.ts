import express from 'express';
import validateRegistrationSchema from '../utils/schema/auth-schema/register-user-schema';
import {
  checkStatus,
  deleteAllUser,
  loginUser,
  logoutUser,
  registerNewUser,
  requestPasswordResetToken,
  resetPassword,
} from '../controllers/auth-controller';
import { catchValidationErrors } from '../middlewares/validation-catch';
import validateLoginSchema from '../utils/schema/auth-schema/login-user-schema';
import authMiddleware from '../middlewares/auth-middleware';
import passwordRequestChangeSchema from '../utils/schema/auth-schema/password-token-request-schema';
import passwordRequestVerificationSchema from '../utils/schema/auth-schema/password-token-verify-schema';

const router = express.Router();

router.post(
  '/reset-password:token',
  passwordRequestVerificationSchema,
  catchValidationErrors,
  resetPassword
);

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
// WARNING ONLY USE FOR DEVELOPMENT ONLY.
router.post('/delete-all', authMiddleware, deleteAllUser);

export default router;
