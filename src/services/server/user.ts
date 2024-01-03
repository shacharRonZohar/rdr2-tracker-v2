import type { Prisma, PrismaClient } from '@prisma/client'

export function getUsers(prisma: PrismaClient) {
  return prisma.user.findMany()
}

const defaultSelect = {
  id: true,
  email: true,
  userName: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect
export function getUser<
  W extends Prisma.UserWhereUniqueInput,
  S extends Prisma.UserSelect,
>(prisma: PrismaClient, where: W, select?: S) {
  return prisma.user.findUnique({
    select: select || defaultSelect,
    where,
  })
}

export function createUser(prisma: PrismaClient, data: Prisma.UserCreateInput) {
  return prisma.user.create({
    data,
  })
}
