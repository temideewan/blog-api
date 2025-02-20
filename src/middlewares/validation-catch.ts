import { RequestHandler } from 'express';
import { matchedData, validationResult } from 'express-validator';
import { errorFormatter } from '../utils/helpers/error-formatter';
import { RequestWithMatchedData } from '../types';

export const catchValidationErrors: RequestHandler = (
  req: RequestWithMatchedData<Record<string, any>>,
  res,
  next
) => {
  const result = validationResult(req);
  const isEmpty = !result.isEmpty();
  if (isEmpty) {
    res.status(400).send({ errors: result.formatWith(errorFormatter).array() });
    return;
  }
  req.matchedData = matchedData(req);
  next();
};
