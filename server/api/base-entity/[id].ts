import { getBaseEntity } from '~/services/server/base-entity'

export default defineEventHandler(ev => {
  const id = getRouterParam(ev, 'id')
  if (!id) {
    throw createError({
      status: 400,
      message: 'id is required',
    })
  }
  return getBaseEntity(ev.context.prisma, id)
})
