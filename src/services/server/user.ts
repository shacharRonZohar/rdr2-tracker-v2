import type { Prisma, PrismaClient } from '@prisma/client'

export function getUsers(prisma: PrismaClient) {
  return prisma.user.findMany()
}

export function getUser<W extends Prisma.UserWhereUniqueInput>(
  prisma: PrismaClient,
  where: W
) {
  return prisma.user.findUnique({
    select: {
      id: true,
      email: true,
      userName: true,
      createdAt: true,
      updatedAt: true,
    },
    where,
  })
}

export function getUserData<W extends Prisma.UserWhereUniqueInput>(
  prisma: PrismaClient,
  where: W
) {
  return prisma.user.findUnique({
    select: {
      data: true,
    },
    where,
  })
}
export function createUser(prisma: PrismaClient, data: Prisma.UserCreateInput) {
  return prisma.user.create({
    data,
  })
}
