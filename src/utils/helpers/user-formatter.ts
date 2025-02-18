type VisibleUser = {
  id: number;
  email: string;
  username: string;
};
const getValidUserResponse = (object: VisibleUser) => {
  return {
    id: object.id,
    email: object.email,
    username: object.username,
  };
};
