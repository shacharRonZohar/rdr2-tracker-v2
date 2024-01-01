import type { Prisma, PrismaClient } from '@prisma/client'
import { createUser, getUser } from './user'

export function signup(prisma: PrismaClient, data: Prisma.UserCreateInput) {
  // TODO: implement actual signup
  return createUser(prisma, data)
}

export function login(
  prisma: PrismaClient,
  data: Pick<Prisma.UserWhereUniqueInput, 'email'>
) {
  // TODO: implement actual login
  return getUser(prisma, data)
}
