import type { Prisma, PrismaClient } from '@prisma/client'
import type { UserDataItem } from '~/models/shared/data'

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
      role: true,
    },
    where,
  })
}

export function createUser(prisma: PrismaClient, data: Prisma.UserCreateInput) {
  return prisma.user.create({
    data,
  })
}

export async function getUserData<W extends Prisma.UserWhereUniqueInput>(
  prisma: PrismaClient,
  where: W
) {
  const res = await prisma.user.findUnique({
    select: {
      data: true,
    },
    where,
  })

  if (!res) {
    return null
  }

  return res.data as UserDataItem
}

export function addUserDataItem(
  prisma: PrismaClient,
  userId: string,
  dataItem: UserDataItem
) {
  const itemId = dataItem.id
  const trackerValues = dataItem.trackerValues
  const trackerValuesJson = JSON.stringify(trackerValues).replace(/'/g, "''") // Escape single quotes

  return prisma.$executeRawUnsafe(`
    WITH entity_check AS (
      SELECT 1 from "BaseEntity" WHERE id = '${itemId}'
    ) 
    UPDATE "User"
    SET data = jsonb_set(data::jsonb, '{${itemId}}', '${trackerValuesJson}'::jsonb, true)
    FROM entity_check
    WHERE "User".id = '${userId}' AND EXISTS (SELECT 1 FROM entity_check);
  `)
}
