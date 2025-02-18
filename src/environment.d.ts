import { Prisma } from "@prisma/client";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      NODE_ENV: 'development' | 'production';
      MAILTRAP_TOKEN: string;
      PORT?: string;
    }
  }
  namespace Express {
    interface Request {
      matchedData?: any;
    }
  }
}


export {}
