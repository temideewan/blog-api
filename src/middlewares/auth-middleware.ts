import { RequestHandler } from 'express';
import { decodeToken } from '../utils/helpers/jwt-helper';
import { BlackList } from '../utils/database/redis-client';
import { RequestWithUser } from '../types';

const authMiddleware: RequestHandler = async (
  req: RequestWithUser,
  res,
  next
) => {
  const accessToken = req.headers.authorization?.split(' ').pop();
  if (!accessToken) {
    res
      .status(401)
      .json({ message: 'Unauthorized: please login', success: false });
    return;
  }
  const payload = decodeToken(accessToken);
  if (!payload) {
    res
      .status(401)
      .json({ message: 'Unauthorized: please login', success: false });
    return;
  }
  const blackListedToken = await BlackList.get(accessToken);
  if (blackListedToken === 'true') {
    res
      .status(401)
      .json({ message: 'Unauthorized: please login', success: false });
    return;
  }
  req.user = payload.user;
  next();
};

export default authMiddleware;
