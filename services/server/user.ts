import type { Prisma, PrismaClient } from '@prisma/client'
import { hasAtLeastOneKey } from '../shared/util'
import type { Optional } from '~/models/shared/util'

export function getUsers(prisma: PrismaClient) {
  return prisma.user.findMany()
}

export function getUser(
  prisma: PrismaClient,
  where: Optional<Prisma.UserWhereUniqueInput>
) {
  // TODO: find a way to get rid of this generic hack
  if (!hasAtLeastOneKey<Prisma.UserWhereUniqueInput>(where)) {
    throw new Error('At least one key must be provided')
  }

  //   TODO: Find a way to get rid of this type assertion
  return prisma.user.findUnique({
    where,
  })
}

export function createUser(prisma: PrismaClient, data: Prisma.UserCreateInput) {
  return prisma.user.create({
    data,
  })
}
