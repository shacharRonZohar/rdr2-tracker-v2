import { getUserData } from '~/services/server/user'

export default defineProtectedHandler(async ev => {
  const id = ev.context.user.id
  const data = await getUserData(ev.context.prisma, { id })
  if (!data) {
    throw new Error('No data found')
  }

  return data
})
