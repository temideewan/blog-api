type VisibleUser = {
  id: number;
  email: string;
  username: string;
};
export const getValidUserResponse = (object: VisibleUser) => {
  return {
    id: object.id,
    email: object.email,
    username: object.username,
  };
};
