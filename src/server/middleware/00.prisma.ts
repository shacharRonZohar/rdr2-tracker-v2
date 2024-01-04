import { getPrismaClient } from '~/../prisma/db'

export default defineEventHandler(event => {
  event.context.prisma = getPrismaClient()
})
