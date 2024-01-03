import { errorMsgs } from '~/models/shared/errors'
import { loginApiInput } from '~/models/shared/schemas'
import { login } from '~/services/server/auth'
import {
  generateAccessToken,
  generateRefreshToken,
} from '~/services/server/jwt'
import { parseBody } from '~/services/server/parsing'

export default defineEventHandler(async ev => {
  try {
    const body = await parseBody(ev, loginApiInput)
    const { user } = await login(ev.context.prisma, body)

    const { jwtSecret } = useRuntimeConfig()
    const accessToken = generateAccessToken(user, jwtSecret)
    const refreshToken = generateRefreshToken({ id: user.id }, jwtSecret)

    // set the refresh token cookie
    setCookie(ev, 'refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days,
      sameSite: 'strict',
      // secure: true,
    })
    return {
      accessToken,
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    const error =
      err instanceof Error &&
      err.message === errorMsgs.public.incorrectCredentials
        ? { statusCode: 400, message: errorMsgs.public.incorrectCredentials }
        : { statusCode: 500, message: errorMsgs.public.unknown }

    throw createError({
      ...error,
    })
  }
})
