import { checkSchema } from 'express-validator';

const editUserSchema = checkSchema({
  firstName: {
    isString: {
      errorMessage: 'First name must be a string',
    },
    isLength: {
      errorMessage: 'First name must be between 2 and 50 characters long',
      options: { min: 2, max: 50 },
    },
  },
  lastName: {
    isString: {
      errorMessage: 'First name must be a string',
    },
    isLength: {
      errorMessage: 'First name must be between 2 and 50 characters long',
      options: { min: 2, max: 50 },
    },
  },
  email: {
    isString: {
      errorMessage: 'Email must be a string',
    },
  },
  accountType: {
    isString: {
      errorMessage: 'accountType must be a string',
    },
    isIn: {
      options: [['Freelance', 'Company']],
      errorMessage: "accountType must be either 'Freelance' or 'Company'",
    },
  },
  country: {
    isString: {
      errorMessage: 'country must be a string',
    },
  },
  countryCode: {
    isString: {
      errorMessage: 'countryCode must be a string',
    },
  },
  state: {
    isString: {
      errorMessage: 'state must be a string',
    },
  },
  address: {
    isString: {
      errorMessage: 'address must be a string',
    },
  },
  phoneNumber: {
    isString: {
      errorMessage: 'phoneNumber must be a string',
    },
  },
});

export default editUserSchema;
