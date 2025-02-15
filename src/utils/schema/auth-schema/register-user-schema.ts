import { checkSchema } from 'express-validator';

const validateRegistrationSchema = checkSchema(
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
        errorMessage: 'Email is required',
      },
      isString: {
        errorMessage: 'Email must be a string',
      },
      isLength: {
        options: { min: 8, max: 25 },
        errorMessage: 'Password must be between 8 and 25 characters long',
      },
    },
    username: {
      notEmpty: {
        errorMessage: 'Username is required',
      },
      isString: {
        errorMessage: 'Username must be a string',
      },
      isLength: {
        options: { min: 1 },
        errorMessage: 'Username must be between longer than 1 character',
      },
    },
  },
  ['body']
);

export default validateRegistrationSchema;
