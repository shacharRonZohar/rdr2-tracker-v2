import { getBaseEntities } from '~/services/server/base-entity'

export default defineEventHandler(async ev => {
  return getBaseEntities(ev.context.prisma, ev.context.query.category)
})
