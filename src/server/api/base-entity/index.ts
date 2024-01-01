import { getBaseEntities } from '~/services/server/base-entity'

export default defineEventHandler(ev => {
  return getBaseEntities(ev.context.prisma, ev.context.query.category)
})
