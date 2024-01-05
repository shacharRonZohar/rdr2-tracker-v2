import { baseEntitiesApiInput } from '~/models/shared/schemas'
import { getBaseEntities } from '~/services/server/base-entity'
import { parseQuery } from '~/services/server/parsing'

export default defineEventHandler(ev => {
  const query = parseQuery(ev, baseEntitiesApiInput)
  return getBaseEntities(ev.context.prisma, query.category)
})
