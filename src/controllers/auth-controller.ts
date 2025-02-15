import { RequestHandler } from 'express';
import { RequestWithMatchedData } from '../types';
import prisma from '../database/db';
import { comparePassword, hashPassword } from '../utils/helpers/hash-password';
import jwt from 'jsonwebtoken';
import { signToken } from '../utils/helpers/jwt-helper';

export const registerNewUser: RequestHandler = async (
  req: RequestWithMatchedData<{
    email: string;
    password: string;
    username: string;
  }>,
  res
) => {
  try {
    if (!req.matchedData) {
      res.status(400).json({ success: false, message: 'Invalid request data' });
      return;
    }
    const { email, password, username } = req.matchedData;
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, username },
    });
    const token = signToken(user);
    res.status(201).json({
      success: true,
      data: { token, user: { ...user, password: undefined } },
      message: 'User registered successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error', success: false });
  }
};
export const loginUser: RequestHandler = async (
  req: RequestWithMatchedData<{
    email: string;
    password: string;
  }>,
  res
) => {
  try {
    if (!req.matchedData) {
      res.status(400).json({ success: false, message: 'Invalid request data' });
      return;
    }
    const { email, password } = req.matchedData;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }
    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }
    const token = signToken(user);
    res.status(200).json({
      success: true,
      data: { token, user: { ...user, password: undefined } },
      message: 'User logged in successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error', success: false });
  }
};
