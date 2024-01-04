import { verifyToken } from '~/services/server/jwt'

import { cookieNames } from '~/consts'
import { getUser } from '~/services/server/user'
import { httpErrors } from '~/consts/errors/http'
import { handleHttpServerError } from '~/services/shared/util'
import { generateAndSetNewAccessToken } from '~/services/server/auth'
export default defineEventHandler(async ev => {
  try {
    const refreshJwt = getCookie(ev, cookieNames.refreshToken)
    if (!refreshJwt) {
      throw httpErrors.public.invalidRefreshToken()
    }
    const { jwtSecret } = useRuntimeConfig()
    const decodedRefreshToken = verifyToken<{ id: string }>(
      refreshJwt,
      jwtSecret
    )
    if (!decodedRefreshToken?.id) {
      throw httpErrors.public.invalidRefreshToken()
    }

    const user = await getUser(ev.context.prisma, {
      id: decodedRefreshToken.id,
    })

    if (!user) {
      throw httpErrors.public.invalidRefreshToken()
    }

    const accessToken = generateAndSetNewAccessToken(ev, user)

    return {
      success: true,
      accessToken,
    }
  } catch (err) {
    handleHttpServerError(err)
  }
})
