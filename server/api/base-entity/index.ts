import { Category } from '@prisma/client'
import { getBaseEntities } from '~/services/server/base-entity'

export default defineEventHandler(async ev => {
  return getBaseEntities(ev.context.prisma, Category.PLANT)
})
