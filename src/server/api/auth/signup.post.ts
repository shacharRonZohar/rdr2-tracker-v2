import { errorMsgs } from '~/models/shared/errors'
import { signupApiInput } from '~/models/shared/schemas'
import { signup } from '~/services/server/auth'
import { parseBody } from '~/services/server/parsing'

export default defineEventHandler(async ev => {
  try {
    const body = await parseBody(ev, signupApiInput)
    if (!body) {
      throw createError({
        statusCode: 400,
        message: 'No body',
      })
    }
    const user = await signup(ev.context.prisma, body)
    return $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: user.email,
        password: body.password,
      },
    })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    if (err instanceof Error) {
      if (err.message === errorMsgs.public.emailExists) {
        throw createError({
          status: 400,
          message: errorMsgs.public.emailExists,
        })
      } else
        throw createError({
          statusCode: 400,
          message: err?.message,
        })
    }
  }
})
