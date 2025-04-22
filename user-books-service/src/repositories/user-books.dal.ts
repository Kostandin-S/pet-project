import {
  Prisma,
  PrismaClient,
} from '../generated/prisma/client';
import { preparePrismaError } from '../helpers/generate-prisma-error';
import { PrismaError } from '../utils/errors';

const prisma = new PrismaClient();

export const addBookToUser = async (data: Prisma.UserBooksCreateInput) => {
  try {
    return await prisma.userBooks.create({ data });
  } catch (error) {
    const { httpCode, name, message, details } = preparePrismaError(error);
    throw new PrismaError(httpCode, name, message, details);
  }
};

export const getUserBooks = async (where: Prisma.UserBooksWhereInput) => {
  try {
    return await prisma.userBooks.findMany({ where });
  } catch (error) {
    const { httpCode, name, message, details } = preparePrismaError(error);
    throw new PrismaError(httpCode, name, message, details);
  }
};

export const getUserBookById = async (
  where: Prisma.UserBooksWhereUniqueInput
) => {
  try {
    return await prisma.userBooks.findUnique({
      where,
    });
  } catch (error) {
    const { httpCode, name, message, details } = preparePrismaError(error);
    throw new PrismaError(httpCode, name, message, details);
  }
};

export const updateUserBook = async (
  where: Prisma.UserBooksWhereUniqueInput,
  data: Prisma.UserBooksUpdateInput
) => {
  try {
    return await prisma.userBooks.update({
      where,
      data,
    });
  } catch (error) {
    const { httpCode, name, message, details } = preparePrismaError(error);
    throw new PrismaError(httpCode, name, message, details);
  }
};

export const deleteUserBook = async (
  where: Prisma.UserBooksWhereUniqueInput
) => {
  try {
    return await prisma.userBooks.delete({ where });
  } catch (error) {
    const { httpCode, name, message, details } = preparePrismaError(error);
    throw new PrismaError(httpCode, name, message, details);
  }
};

export const updateManyUserBooks = async (
  where: Prisma.UserBooksWhereInput,
  data: Prisma.UserBooksUpdateInput
) => {
  try {
    return await prisma.userBooks.updateMany({ where, data });
  } catch (error) {
    const { httpCode, name, message, details } = preparePrismaError(error);
    throw new PrismaError(httpCode, name, message, details);
  }
};
