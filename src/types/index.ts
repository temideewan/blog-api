import { AccountType } from '@prisma/client';
import { Request } from 'express';
export type RequestWithMatchedData<T = Record<string, any>> = Request & {
  matchedData?: T;
};
export type RequestWithUser<T = Record<string, any>> = Request & { user?: T };

export type RegisterUserPayload = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  accountType: AccountType;
  country: string;
  countryCode: string;
  state: string;
  address: string;
  phoneNumber: string;
};
