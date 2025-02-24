import { RequestHandler } from 'express';
import prisma from '../utils/database/db';
import {
  RegisterUserPayload,
  RequestWithMatchedData,
  RequestWithUser,
} from '../types';
export const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const users = await prisma.user.findMany({});
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
      data: user,
      message: 'User retrieved successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error', success: false });
  }
};
type UpdateUserPayload = RequestWithMatchedData<
  RegisterUserPayload & { user: { id: number } }
>;
export const updateUser: RequestHandler = async (
  req: UpdateUserPayload,
  res
) => {
  try {
    if (!req.matchedData) {
      res.status(400).json({ message: 'Invalid request data', success: false });
      return;
    }
    const { user, ...userUpdate } = req.matchedData;
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: { ...userUpdate },
    });
    if (!updatedUser) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    res.status(200).json({
      success: true,
      data: updatedUser,
      message: 'User updated successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong', success: false });
  }
};
