import { errorMsgs } from '~/models/shared/errors'
import { login } from '~/services/server/auth'

export default defineEventHandler(async ev => {
  try {
    const { user, accessToken, refreshToken } = await login(
      ev.context.prisma,
      ev.context.body
    )
    // set the access cookie
    setCookie(ev, 'access', accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days,
      sameSite: 'strict',
      secure: true,
    })

    // set the refresh token cookie
    setCookie(ev, 'refresh', refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days,
      sameSite: 'strict',
      secure: true,
    })
    return user
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
