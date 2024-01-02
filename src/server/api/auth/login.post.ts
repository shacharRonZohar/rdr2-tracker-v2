import { errorMsgs } from '~/models/shared/errors'
import { login } from '~/services/server/auth'

export default defineEventHandler(async ev => {
  try {
    const { user, token } = await login(ev.context.prisma, ev.context.body)
    // set the jwt cookie
    setCookie(ev, 'user', token, {
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
