import { RequestHandler } from 'express';
import prisma from '../utils/database/db';
export const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        posts: true
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
