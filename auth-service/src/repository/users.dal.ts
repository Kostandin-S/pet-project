import {
  Prisma,
  PrismaClient,
} from '../generated/prisma/client';
import { preparePrismaError } from '../helpers/generate-prisma-error';
import { PrismaError } from '../utils/errors';

const prisma = new PrismaClient();

export const findFirstUser = async (where: Prisma.UserWhereInput) => {
  try {
    return await prisma.user.findFirst({ where });
  } catch (error) {
    const { httpCode, name, message, details } = preparePrismaError(error);
    throw new PrismaError(httpCode, name, message, details);
  }
};

export const findUniqueUser = async (where: Prisma.UserWhereUniqueInput) => {
  try {
    return await prisma.user.findUnique({ where });
  } catch (error) {
    const { httpCode, name, message, details } = preparePrismaError(error);
    throw new PrismaError(httpCode, name, message, details);
  }
};

export const createUser = async (data: Prisma.UserCreateInput) => {
  try {
    return await prisma.user.create({ data });
  } catch (error) {
    const { httpCode, name, message, details } = preparePrismaError(error);
    throw new PrismaError(httpCode, name, message, details);
  }
};

export const getUsers = async (where: Prisma.UserWhereInput) => {
  try {
    return await prisma.user.findMany({ where });
  } catch (error) {
    const { httpCode, name, message, details } = preparePrismaError(error);
    throw new PrismaError(httpCode, name, message, details);
  }
};

export const updateUser = async (
  where: Prisma.UserWhereUniqueInput,
  data: Prisma.UserUpdateInput
) => {
  try {
    return await prisma.user.update({ where, data });
  } catch (error) {
    const { httpCode, name, message, details } = preparePrismaError(error);
    throw new PrismaError(httpCode, name, message, details);
  }
};

export const deleteUser = async (where: Prisma.UserWhereUniqueInput) => {
  try {
    return await prisma.user.delete({ where });
  } catch (error) {
    const { httpCode, name, message, details } = preparePrismaError(error);
    throw new PrismaError(httpCode, name, message, details);
  }
};
