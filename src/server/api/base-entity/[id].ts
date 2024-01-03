import { httpErrors } from '~/consts/errors/http'
import { getBaseEntity } from '~/services/server/base-entity'

export default defineEventHandler(ev => {
  const id = getRouterParam(ev, 'id')
  if (!id) {
    throw httpErrors.public.missingRouteParam('id')
  }
  return getBaseEntity(ev.context.prisma, id)
})
