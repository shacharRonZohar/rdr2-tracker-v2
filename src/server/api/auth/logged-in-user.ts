import { getUser } from '~/services/server/user'

export default defineEventHandler(ev => {
  const id = ev.context.userId
  if (!id) {
    throw createError({
      status: 401,
      message: 'Not logged in',
    })
  }
  return getUser(ev.context.prisma, { id })
})
