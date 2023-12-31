import { getPlants } from '~/server/services/plant'

export default defineEventHandler(async ev => {
  return getPlants(ev.context.prisma)
})
