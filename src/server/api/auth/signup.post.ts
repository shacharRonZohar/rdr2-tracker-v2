import { httpErrors } from '~/consts/errors/http'
import { signupApiInput } from '~/models/shared/schemas'
import { signup } from '~/services/server/auth'
import { parseBody } from '~/services/server/parsing'
import { handleHttpServerError } from '~/services/shared/util'

export default defineEventHandler(async ev => {
  try {
    const body = await parseBody(ev, signupApiInput)
    if (!body) {
      throw httpErrors.public.missingBody()
    }
    await signup(ev.context.prisma, body)
    return {
      success: true,
    }
  } catch (err) {
    handleHttpServerError(err)
  }
})
