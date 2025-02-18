import { checkSchema } from 'express-validator';

const passwordRequestVerificationSchema = checkSchema(
  {
    token: {
      notEmpty: {
        errorMessage: 'Token is required',
      },
      isString: {
        errorMessage: 'Token must be a string',
      },
    },
  },
  ['params']
);

export default passwordRequestVerificationSchema;
