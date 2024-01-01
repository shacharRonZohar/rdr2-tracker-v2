import {
  Category,
  SubCategory,
  type PrismaClient,
  Prisma,
} from '@prisma/client'

const generalSelect = {
  id: true,
  name: true,
  category: true,
  subCategory: true,
} satisfies Prisma.BaseEntitySelect

const detailedSelect = {
  ...generalSelect,
  locations: {
    select: {
      id: true,
      text: true,
      locationData: {
        select: {
          id: true,
          name: true,
          region: true,
          state: true,
          comments: true,
        },
      },
      comments: true,
    },
  },
  comments: true,
} satisfies Prisma.BaseEntitySelect

export function getBaseEntities(
  prisma: PrismaClient,
  category: Category,
  subCategory: SubCategory | undefined = undefined
) {
  return prisma.baseEntity.findMany({
    select: generalSelect,
    where: {
      category,
      subCategory,
    },
  })
}

export function getBaseEntity(prisma: PrismaClient, id: string) {
  return prisma.baseEntity.findUnique({
    select: detailedSelect,
    where: {
      id,
    },
  })
}
