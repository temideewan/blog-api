import { Prisma } from "@prisma/client";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      NODE_ENV: 'development' | 'production';
      MAILTRAP_TOKEN: string;
      PORT?: string;
      CLOUDINARY_CLOUD_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
    }
  }
  namespace Express {
    interface Request<T> {
      matchedData?: T;
    }
  }
}


export {}
