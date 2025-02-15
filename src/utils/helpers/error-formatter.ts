import { ValidationError } from 'express-validator';

export const errorFormatter = (error: ValidationError) => {
  switch (error.type) {
    case 'field': {
      if (error && error.value && error.path && error.msg) {
        return `Invalid value '${error.value}' for '${error.path}. ${error.msg}'`;
      }
      if (error && !error.value && error.path && error.msg) {
        return `No value given for expected '${error.path}' property. ${error.msg}'`;
      }
      if (error && error.msg) {
        return error.msg;
      }
      return 'An error occurred';
    }
    case 'unknown_fields': {
      if (error && error.fields && error.msg) {
        return `Invalid fields: ${error.fields.map((field) => field.path).join(', ')} - ${error.msg}`;
      }
      return 'An error occurred';
    }
    case 'alternative': {
      if (error && error.msg) {
        return error.msg;
      }
      return 'An error occurred while validating the alternative fields';
    }
    default: {
      return `An unknown error occurred during validation`;
    }
  }
};
