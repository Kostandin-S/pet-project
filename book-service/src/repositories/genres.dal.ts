import {
  Prisma,
  PrismaClient,
} from '../generated/prisma/client';
import { preparePrismaError } from '../helpers/generate-prisma-error';
import { PrismaError } from '../utils/errors';

const prisma = new PrismaClient();

export const createGenre = async (data: Prisma.GenreCreateInput) => {
  try {
    return await prisma.genre.create({ data });
  } catch (error) {
    const { httpCode, name, message, details } = preparePrismaError(error);
    throw new PrismaError(httpCode, name, message, details);
  }
};

export const findFirstGenre = async (where: Prisma.GenreWhereInput) => {
  try {
    return await prisma.genre.findFirst({ where });
  } catch (error) {
    const { httpCode, name, message, details } = preparePrismaError(error);
    throw new PrismaError(httpCode, name, message, details);
  }
};

export const findGenres = async () => {
  try {
    return await prisma.genre.findMany();
  } catch (error) {
    const { httpCode, name, message, details } = preparePrismaError(error);
    throw new PrismaError(httpCode, name, message, details);
  }
};

export const findUniqueGenre = async (where: Prisma.GenreWhereUniqueInput) => {
  try {
    return await prisma.genre.findUnique({ where });
  } catch (error) {
    const { httpCode, name, message, details } = preparePrismaError(error);
    throw new PrismaError(httpCode, name, message, details);
  }
};

export const updateGenre = async (
  where: Prisma.GenreWhereUniqueInput,
  data: Prisma.GenreUpdateInput
) => {
  try {
    return await prisma.genre.update({ where, data });
  } catch (error) {
    const { httpCode, name, message, details } = preparePrismaError(error);
    throw new PrismaError(httpCode, name, message, details);
  }
};

export const deleteGenre = async (where: Prisma.GenreWhereUniqueInput) => {
  try {
    return await prisma.genre.delete({ where });
  } catch (error) {
    const { httpCode, name, message, details } = preparePrismaError(error);
    throw new PrismaError(httpCode, name, message, details);
  }
};
