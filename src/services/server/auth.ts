import { Prisma, type PrismaClient } from '@prisma/client'
import { checkPassword, hashPassword } from './encryption'
import { generateToken } from './jwt'
import { createUser } from './user'
import { errorMsgs } from '~/models/shared/errors'

export async function signup(
  prisma: PrismaClient,
  { email, password, userName }: Prisma.UserCreateInput
) {
  const user = {
    email,
    password: await hashPassword(password),
    userName,
  }
  try {
    return createUser(prisma, user)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    if (
      err &&
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2002' &&
      Array.isArray(err.meta?.target) &&
      err.meta?.target?.includes('email')
    ) {
      throw new Error(errorMsgs.public.emailExists)
    }
    throw err
  }
}

export async function login(
  prisma: PrismaClient,
  { email, password }: { email: string; password: string }
) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  if (!user || !(await checkPassword(password, user.password))) {
    throw new Error(errorMsgs.public.incorrectCredentials)
  }

  const { jwtSecret } = useRuntimeConfig()

  return generateToken({ userId: user.id }, jwtSecret)
}
