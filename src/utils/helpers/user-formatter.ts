import { RegisterUserPayload } from "../../types";

type VisibleUser = Omit<RegisterUserPayload, "password"> & {id: number}
export const getValidUserResponse = (object: VisibleUser) => {
  return {
    ...object,
    password: undefined,
  };
};
