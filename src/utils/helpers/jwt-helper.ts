import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

type TokenPayload = {
  id: number;
  email: string;
};

const signToken = (token: TokenPayload) => {
  if (!token) throw new Error('Invalid token payload');
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error(`Invalid JWT secret`);
  return jwt.sign(token, secret, { expiresIn: '30m' });
};

const decodeToken = (token: string) => {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error(`Invalid JWT secret`);
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export { signToken, decodeToken };
