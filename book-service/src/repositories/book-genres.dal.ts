import { Prisma, PrismaClient } from "../generated/prisma/client";
import { preparePrismaError } from "../helpers/generate-prisma-error";
import { PrismaError } from "../utils/errors";

const prisma = new PrismaClient();

export const createManyBookGenres = async (
  data: Prisma.BookGenresCreateManyInput | Prisma.BookGenresCreateManyInput[]
) => {
  try {
    return await prisma.bookGenres.createMany({ data });
  } catch (error) {
    const { httpCode, name, message, details } = preparePrismaError(error);
    throw new PrismaError(httpCode, name, message, details);
  }
};
