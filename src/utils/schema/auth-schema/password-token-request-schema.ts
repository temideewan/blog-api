import { checkSchema } from 'express-validator';

const passwordRequestChangeSchema = checkSchema(
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
  },
  ['body']
);

export default passwordRequestChangeSchema;
