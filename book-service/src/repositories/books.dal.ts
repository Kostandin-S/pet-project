import { Prisma, PrismaClient } from "../generated/prisma/client";
import { preparePrismaError } from "../helpers/generate-prisma-error";
import { PrismaError } from "../utils/errors";

const prisma = new PrismaClient();

export const findFirstBook = async (where: Prisma.BookWhereInput) => {
  try {
    return await prisma.book.findFirst({
      where,
      include: { genres: { include: { genre: true } } },
    });
  } catch (error) {
    const { httpCode, name, message, details } = preparePrismaError(error);
    throw new PrismaError(httpCode, name, message, details);
  }
};

export const findUniqueBook = async (where: Prisma.BookWhereInput) => {
  try {
    return await prisma.book.findFirst({
      where,
      include: { genres: { include: { genre: true } } },
    });
  } catch (error) {
    const { httpCode, name, message, details } = preparePrismaError(error);
    throw new PrismaError(httpCode, name, message, details);
  }
};

export const createBook = async (data: Prisma.BookCreateInput) => {
  try {
    return await prisma.book.create({ data });
  } catch (error) {
    const { httpCode, name, message, details } = preparePrismaError(error);
    throw new PrismaError(httpCode, name, message, details);
  }
};

export const findManyBooks = async (where: Prisma.BookWhereInput) => {
  try {
    return await prisma.book.findMany({
      where,
      include: { genres: { include: { genre: true } } },
    });
  } catch (error) {
    const { httpCode, name, message, details } = preparePrismaError(error);
    throw new PrismaError(httpCode, name, message, details);
  }
};

export const updateBook = async (
  where: Prisma.BookWhereUniqueInput,
  data: Prisma.BookUpdateInput
) => {
  try {
    return await prisma.book.update({
      where,
      data,
      include: { genres: { include: { genre: true } } },
    });
  } catch (error) {
    const { httpCode, name, message, details } = preparePrismaError(error);
    throw new PrismaError(httpCode, name, message, details);
  }
};

export const deleteBook = async (where: Prisma.BookWhereUniqueInput) => {
  try {
    return await prisma.book.delete({ where });
  } catch (error) {
    const { httpCode, name, message, details } = preparePrismaError(error);
    throw new PrismaError(httpCode, name, message, details);
  }
};
