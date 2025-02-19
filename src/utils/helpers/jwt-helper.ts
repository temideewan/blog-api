import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

type TokenPayload = {
  id: number;
  email: string;
};

const signToken = (payload: TokenPayload, key = 'user') => {
  if (!payload) throw new Error('Invalid token payload');
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error(`Invalid JWT secret`);
  return jwt.sign({ [key]: payload }, secret, { expiresIn: '30m' });
};

const decodeToken = (token: string): JwtPayload | undefined => {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error(`Invalid JWT secret`);
    return jwt.verify(token, secret) as JwtPayload & { user?: any };
  } catch (error) {
    console.log(error)
    throw error;
  }
};

export { signToken, decodeToken };
