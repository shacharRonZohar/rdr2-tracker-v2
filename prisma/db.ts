import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient
declare module 'h3' {
  interface H3EventContext {
    prisma: PrismaClient
  }
}

export function getPrismaClient() {
  if (!prisma) {
    // eslint-disable-next-line no-console
    console.log('Creating new PrismaClient')
    prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    })
  }
  return prisma
}
