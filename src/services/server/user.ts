import type { Prisma, PrismaClient } from '@prisma/client'

export function getUsers(prisma: PrismaClient) {
  return prisma.user.findMany()
}

export function getUser<T extends Prisma.UserWhereUniqueInput>(
  prisma: PrismaClient,
  where: T
) {
  return prisma.user.findUnique({
    select: {
      id: true,
      email: true,
      userName: true,
      data: true,
      createdAt: true,
      updatedAt: true,
    },
    where,
  })
}

export function createUser(prisma: PrismaClient, data: Prisma.UserCreateInput) {
  return prisma.user.create({
    data,
  })
}
