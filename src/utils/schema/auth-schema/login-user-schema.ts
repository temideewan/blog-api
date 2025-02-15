import { checkSchema } from 'express-validator';

const validateLoginSchema = checkSchema(
  {
    email: {
      notEmpty: {
        errorMessage: 'Email is required',
      },
      isString: {
        errorMessage: 'Email must be a string',
      },
      isEmail: {
        errorMessage: 'Invalid email format',
      },
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
    },
  },
  ['body']
);

export default validateLoginSchema;
