import { Prisma } from '@prisma/client'
import { protectedRoutes } from '~/services/server/protected-routes'
import { getUserData } from '~/services/server/user'

protectedRoutes.protectRoute('/api/user-data')
export default defineEventHandler(async ev => {
  const id = ev.context.user!.id

  const res = await getUserData(ev.context.prisma, { id })
  if (!res?.data) {
    throw new Error('No data found')
  }

  return res.data as Prisma.JsonObject
})
