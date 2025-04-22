import {
  Prisma,
  PrismaClient,
} from '../generated/prisma/client';
import { preparePrismaError } from '../helpers/generate-prisma-error';
import { PrismaError } from '../utils/errors';

const prisma = new PrismaClient();

export const findFirstProfile = async (where: Prisma.ProfileWhereInput) => {
  try {
    return await prisma.profile.findFirst({ where });
  } catch (error) {
    const { httpCode, name, message, details } = preparePrismaError(error);
    throw new PrismaError(httpCode, name, message, details);
  }
};

export const findUniqueProfile = async (
  where: Prisma.ProfileWhereUniqueInput
) => {
  try {
    return await prisma.profile.findUnique({ where });
  } catch (error) {
    const { httpCode, name, message, details } = preparePrismaError(error);
    throw new PrismaError(httpCode, name, message, details);
  }
};

export const createProfile = async (data: Prisma.ProfileCreateInput) => {
  try {
    return await prisma.profile.create({ data });
  } catch (error) {
    const { httpCode, name, message, details } = preparePrismaError(error);
    throw new PrismaError(httpCode, name, message, details);
  }
};

export const getProfiles = async (where: Prisma.ProfileWhereInput) => {
  try {
    return await prisma.profile.findMany({ where });
  } catch (error) {
    const { httpCode, name, message, details } = preparePrismaError(error);
    throw new PrismaError(httpCode, name, message, details);
  }
};

export const updateProfile = async (
  where: Prisma.ProfileWhereUniqueInput,
  data: Prisma.ProfileUpdateInput
) => {
  try {
    return await prisma.profile.update({ where, data });
  } catch (error) {
    const { httpCode, name, message, details } = preparePrismaError(error);
    throw new PrismaError(httpCode, name, message, details);
  }
};

export const deleteProfile = async (where: Prisma.ProfileWhereUniqueInput) => {
  try {
    return await prisma.profile.delete({ where });
  } catch (error) {
    const { httpCode, name, message, details } = preparePrismaError(error);
    throw new PrismaError(httpCode, name, message, details);
  }
};
