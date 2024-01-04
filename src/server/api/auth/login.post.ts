import { loginApiInput } from '~/models/shared/schemas'
import {
  generateAndSetNewAccessToken,
  generateAndSetNewRefreshToken,
  login,
} from '~/services/server/auth'

import { parseBody } from '~/services/server/parsing'
import { handleHttpServerError } from '~/services/shared/util'

export default defineEventHandler(async ev => {
  try {
    const body = await parseBody(ev, loginApiInput)
    const { user } = await login(ev.context.prisma, body)

    generateAndSetNewAccessToken(ev, user)
    generateAndSetNewRefreshToken(ev, user.id)

    return {
      success: true,
    }
  } catch (err) {
    handleHttpServerError(err)
  }
})
