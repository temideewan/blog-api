import { checkSchema } from 'express-validator';

const resetPasswordSchema = checkSchema(
  {
    token: {
      notEmpty: {
        errorMessage: 'Token is required',
      },
      isString: {
        errorMessage: 'Token must be a string',
      },
      in: 'params',
    },
    email: {
      notEmpty: {
        errorMessage: 'Email is required',
      },
      isString: {
        errorMessage: 'Email must be a string',
      },
      in: 'body',
    },
    password: {
      notEmpty: {
        errorMessage: 'Password is required',
      },
      isString: {
        errorMessage: 'Password must be a string',
      },
      isLength: {
        options: { min: 8, max: 25 },
        errorMessage: 'Password must be between 8 and 25 characters long',
      },
      in: 'body',
    },
  },
);

export default resetPasswordSchema;
