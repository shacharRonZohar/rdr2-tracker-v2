import type { PrismaClient } from '@prisma/client'

export function getPlants(prisma: PrismaClient) {
  return prisma.plant.findMany({
    select: {
      id: true,
      name: true,
      location: true,
    },
  })
}
