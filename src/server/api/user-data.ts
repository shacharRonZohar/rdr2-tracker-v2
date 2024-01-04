import { httpErrors } from '~/consts/errors/http'
import { getUser } from '~/services/server/user'

export default defineEventHandler(ev => {
  const id = ev.context.user?.id
  if (!id) {
    throw httpErrors.public.notLoggedIn()
  }
  return getUser(
    ev.context.prisma,
    { id },
    {
      data: true,
    }
  )
})
