import { RequestHandler } from 'express';
import { RequestWithMatchedData, RequestWithUser } from '../types';
import prisma from '../utils/database/db';
import { comparePassword, hashPassword } from '../utils/helpers/hash-password';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { signToken } from '../utils/helpers/jwt-helper';
import { BlackList } from '../utils/database/redis-client';
import { sendPasswordResetRequestEmail } from '../utils/helpers/mailtrap/emails';

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
      data: { token, user: getValidUserResponse(user) },
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
    const foundUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!foundUser) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }
    const isPasswordMatch = await comparePassword(password, foundUser.password);
    if (!isPasswordMatch) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }
    const token = signToken(foundUser);
    res.status(200).json({
      success: true,
      data: { accessToken: token },
      message: 'User logged in successfully',
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'An error occurred, please try again', success: false });
  }
};

export const logoutUser: RequestHandler = async (req, res) => {
  try {
    const accessToken = req.headers.authorization?.split(' ').pop();
    if (!accessToken) {
      res
        .status(401)
        .json({ success: false, message: 'Unauthorized: Token required' });
      return;
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error(`Invalid JWT secret`);
    const accessTokenPayload = jwt.verify(accessToken, secret);
    const currentTimeInSeconds = Math.round(Date.now() / 1000);
    if (typeof accessTokenPayload == 'string' || !accessTokenPayload.exp)
      throw new Error('Invalid access token payload');
    // set the token expiration in redis DB
    const tokenLife = accessTokenPayload.exp - currentTimeInSeconds;
    await BlackList.set(accessToken, 'true', { EX: tokenLife });
    res
      .status(200)
      .json({ success: true, message: 'User logged out successfully' });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'An error occurred, please try again', success: false });
  }
};

export const requestPasswordResetToken: RequestHandler = async (
  req: RequestWithMatchedData<{ email: string }>,
  res
) => {
  try {
    if (!req.matchedData) {
      res.status(400).json({
        success: false,
        message: 'Invalid request data, email required',
      });
      return;
    }
    const { email } = req.matchedData;
    const foundUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!foundUser) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    // send reset token to user email
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 1 * 60 * 60 * 1000);
    await prisma.user.update({
      where: { id: foundUser.id },
      data: { resetToken, resetTokenExpiry },
    });
    // send email with reset token
    await sendPasswordResetRequestEmail(email, resetToken);
    res.status(200).json({
      success: true,
      message: 'Reset token sent to your email',
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'An error occurred, please try again', success: false });
  }
};
export const verifyToken: RequestHandler = async (req, res) => {}

export const checkStatus: RequestHandler = async (
  req: RequestWithUser,
  res
) => {
  try {
    if (!req.user) {
      res
        .status(401)
        .json({ success: false, message: 'User is not logged in' });
      return;
    }
    res.status(200).json({ success: true, message: 'User is logged in' });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'An error occurred, please try again', success: false });
  }
};
