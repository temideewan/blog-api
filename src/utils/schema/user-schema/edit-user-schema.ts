import { checkSchema } from "express-validator";

const editUserSchema = checkSchema({
  userName: {
    isString: {
      errorMessage: "First name must be a string"
    },
    isLength: {
      errorMessage: "First name must be between 2 and 50 characters long",
      options: { min: 2, max: 50 }
    }
  },
})
