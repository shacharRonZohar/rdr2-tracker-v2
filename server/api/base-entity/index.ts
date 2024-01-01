import { Category } from '@prisma/client'
import { baseEntitiesApiInput } from '~/models/shared/schemas'
import { getBaseEntities } from '~/services/server/base-entity'
import { validate } from '~/services/shared/validation'

export default defineEventHandler(async ev => {
  return getBaseEntities(ev.context.prisma, ev.context.query.category)
})
