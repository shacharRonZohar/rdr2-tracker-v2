import { Prisma, type PrismaClient } from '@prisma/client'
import { checkPassword, hashPassword } from './encryption'
import { createUser } from './user'
import { generateAccessToken, generateRefreshToken } from './jwt'
import { httpErrors } from '~/consts/errors/http'
import type { ExtractedH3Event } from '~/models/server/h3'
import { cookieNames } from '~/consts'
import type { UserWithoutPasswordOrData } from '~/models/shared/user'

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
    // TODO: Double check this error code, and make sure it's working as expected
    if (
      err &&
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2002' &&
      Array.isArray(err.meta?.target) &&
      err.meta?.target?.includes('email')
    ) {
      throw httpErrors.public.emailExists()
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
    throw httpErrors.public.incorrectCredentials()
  }

  // TODO: Find the rule that allows this
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, data: __, ...cleanUser } = user

  return {
    user: cleanUser,
  }
}

export function setNewAccessToken(ev: ExtractedH3Event, accessToken: string) {
  // set the access token cookie
  setCookie(ev, cookieNames.accessToken, accessToken, {
    maxAge: 60 * 15, // 15 minutes,
    sameSite: 'strict',
    // secure: true,
  })
}

export function generateAndSetNewAccessToken(
  ev: ExtractedH3Event,
  user: UserWithoutPasswordOrData
) {
  const { jwtSecret } = useRuntimeConfig()
  const accessToken = generateAccessToken(user, jwtSecret)
  setNewAccessToken(ev, accessToken)

  return accessToken
}

export function setNewRefreshToken(ev: ExtractedH3Event, refreshToken: string) {
  // set the refresh token cookie
  setCookie(ev, cookieNames.refreshToken, refreshToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days,
    sameSite: 'strict',
    // secure:   true,
  })
}

export function generateAndSetNewRefreshToken(
  ev: ExtractedH3Event,
  id: string
) {
  const { jwtSecret } = useRuntimeConfig()
  const refreshToken = generateRefreshToken({ id }, jwtSecret)
  setNewRefreshToken(ev, refreshToken)
  return refreshToken
}
