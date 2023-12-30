import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient
declare module 'h3' {
  interface H3EventContext {
    prisma: PrismaClient
  }
}

export default defineEventHandler(event => {
  if (!prisma) {
    // eslint-disable-next-line no-console
    console.log('Creating new PrismaClient')
    prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    })
  }

  event.context.prisma = prisma
})
