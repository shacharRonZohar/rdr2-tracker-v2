import { protectedRoutes } from '~/services/server/protected-routes'
import { getUser } from '~/services/server/user'

protectedRoutes.protectRoute('/api/user-data')
export default defineEventHandler(ev => {
  const id = ev.context.user!.id

  return getUser(
    ev.context.prisma,
    { id },
    {
      data: true,
    }
  )
})
