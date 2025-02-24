import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  omit: {
    user: {
      password: true,
      resetToken: true,
      resetTokenExpiry: true,
    }
  }
});

export default prisma;
