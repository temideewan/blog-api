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
    firstName: {
      notEmpty: {
        errorMessage: 'First name is required',
      },
      isString: {
        errorMessage: 'First name must be a string',
      },
      isLength: {
        options: { min: 1 },
        errorMessage: 'First name must be longer than 1 character',
      },
    },
    lastName: {
      notEmpty: {
        errorMessage: 'Last name is required',
      },
      isString: {
        errorMessage: 'Last name must be a string',
      },
      isLength: {
        options: { min: 1 },
        errorMessage: 'Last name must be longer than 1 character',
      },
    },
    accountType: {
      notEmpty: {
        errorMessage: 'Account type is required',
      },
      isString: {
        errorMessage: 'Account type must be a string',
      },
      isIn: {
        options: [['Freelancer', 'Company']],
        errorMessage: "Account type must be either 'Freelancer' or 'Company'",
      },
    },
    country: {
      notEmpty: {
        errorMessage: 'Country is required',
      },
      isString: {
        errorMessage: 'Country must be a string',
      },
      isLength: {
        options: { min: 1 },
        errorMessage: 'Country must be at least 1 character',
      },
    },
    countryCode: {
      notEmpty: {
        errorMessage: 'Country code is required',
      },
      isString: {
        errorMessage: 'Country code must be a string',
      },
      isLength: {
        options: { min: 1, max: 3 },
        errorMessage:
          'Country code must be between 1 and 3 (inclusive) characters long',
      },
    },
    state: {
      notEmpty: {
        errorMessage: 'State is required',
      },
      isString: {
        errorMessage: 'State must be a string',
      },
      isLength: {
        options: { min: 1 },
        errorMessage: 'State must be longer than 1 character',
      },
    },
    address: {
      notEmpty: {
        errorMessage: 'Address is required',
      },
      isString: {
        errorMessage: 'Address must be a string',
      },
      isLength: {
        options: { min: 1, max: 100 },
        errorMessage:
          'Address must be longer than 1 character and shorter than 100 characters',
      },
    },
    phoneNumber: {
      notEmpty: {
        errorMessage: 'State is required',
      },
      isString: {
        errorMessage: 'State must be a string',
      },
      isLength: {
        options: { min: 1, max: 20 },
        errorMessage:
          'State must be longer than 1 character and shorter than 20 characters',
      },
    },
  },
  ['body']
);

export default validateRegistrationSchema;
