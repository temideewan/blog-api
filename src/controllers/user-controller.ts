import { RequestHandler } from 'express';
import prisma from '../utils/database/db';
import { RequestWithUser } from '../types';
import { getValidUserResponse } from '../utils/helpers/user-formatter';
export const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        posts: true,
      },
    });
    if (!users) {
      res.status(404).json({ success: false, message: 'No users found' });
      return;
    }
    res.status(200).json({
      success: true,
      data: users,
      message: 'Users retrieved successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error', success: false });
  }
};

export const getCurrentUser: RequestHandler = async (
  req: RequestWithUser,
  res
) => {
  try {
    if (!req.user) {
      res
        .status(401)
        .json({ message: 'Unauthorized: please login', success: false });
      return;
    }
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    res.status(200).json({
      success: true,
      data: getValidUserResponse(user),
      message: 'User retrieved successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error', success: false });
  }
};

export const updateUser: RequestHandler = async (
  req: RequestWithUser,
  res
) => {
  
};
