import { RequestHandler } from 'express';
import { RequestWithMatchedData, RequestWithUser } from '../types';
import prisma from '../utils/database/db';
import { comparePassword, hashPassword } from '../utils/helpers/hash-password';
import jwt from 'jsonwebtoken';
import { signToken } from '../utils/helpers/jwt-helper';
import { BlackList } from '../utils/database/redis-client';
import { sendPasswordResetRequestEmail } from '../utils/helpers/mailtrap/emails';
import { getValidUserResponse } from '../utils/helpers/user-formatter';

export const registerNewUser: RequestHandler = async (req: RequestWithMatchedData, res) => {
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
      data: { token, data: getValidUserResponse(user) },
      message: 'User registered successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error', success: false });
  }
};
export const loginUser: RequestHandler = async (req: RequestWithMatchedData, res) => {
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

export const requestPasswordResetToken: RequestHandler = async (req: RequestWithMatchedData, res) => {
  try {
    if (!req.matchedData) {
      res.status(400).json({
        success: false,
        message: 'Invalid request data, email required',
      });
      return;
    }
    const { email } = req.matchedData;

    // send reset token to user email
    // dummy reset token will always work
    const resetToken = `12345`;
    const resetTokenExpiry = new Date(Date.now() + 1 * 60 * 60 * 1000);
    const updatedUser = await prisma.user.update({
      where: { email: email },
      data: { resetToken, resetTokenExpiry },
    });
    if (!updatedUser) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    // send email with reset token
    const clientUrl = process.env.CLIENT_URL;
    if (!clientUrl) throw new Error('Invalid client URL');
    await sendPasswordResetRequestEmail(
      email,
      `${clientUrl}/reset-password/${resetToken}`
    );
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
export const resetPassword: RequestHandler = async (req: RequestWithMatchedData, res) => {
  try {
    if (!req.matchedData) {
      res.status(400).json({
        success: false,
        message: 'Invalid request data, token required',
      });
      return;
    }
    const { token, password, email } = req.matchedData;
    if (!token || !password || !email) {
      res.status(400).json({ success: false, message: 'Invalid request data' });
      return;
    }
    const hashedPassword = await hashPassword(password);
    const foundUser = await prisma.user.update({
      where: {
        email,
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date(Date.now()),
        },
      },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });
    if (!foundUser) {
      res
        .status(404)
        .json({ success: false, message: 'User not found or token expired' });
      return;
    }
    res.status(200).json({
      message: 'User password reset successfully',
      user: getValidUserResponse(foundUser),
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'An error occurred, please try again', success: false });
  }
};

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

export const deleteAllUser: RequestHandler = async(req, res) => {
  try {
    const result = await prisma.user.deleteMany();
    res.status(200).json({ success: true, message: 'All users deleted successfully', deletedCount: result.count });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'An error occurred, please try again' });
  }
}
