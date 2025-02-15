import bcrypt from 'bcryptjs';
export const hashPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log(error);
    throw new Error('An Error occurred while hashing password');
  }
};

export const comparePassword = async (password: string, hash: string) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.log(error);
    throw new Error('An Error occurred while comparing passwords');
  }
}
