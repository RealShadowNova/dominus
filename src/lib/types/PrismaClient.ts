import Prisma, { PrismaClient as P } from '@prisma/client';

export const { PrismaClient } = Prisma;
export type PrismaClient = P;
