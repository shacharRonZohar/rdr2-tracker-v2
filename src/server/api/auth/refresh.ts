import { errorMsgs } from '~/models/shared/errors'
import { generateAccessToken, verifyToken } from '~/services/server/jwt'

import { cookieNames } from '~/consts'
import { getUser } from '~/services/server/user'
export default defineEventHandler(async ev => {
  try {
    const refreshJwt = getCookie(ev, cookieNames.refreshToken)
    if (!refreshJwt) {
      return
    }
    const { jwtSecret } = useRuntimeConfig()
    const decodedRefreshToken = verifyToken<{ id: string }>(
      refreshJwt,
      jwtSecret
    )
    if (!decodedRefreshToken?.id) {
      throw createError({
        statusCode: 401,
        message: 'Invalid refresh token',
      })
    }

    const user = await getUser(ev.context.prisma, {
      id: decodedRefreshToken.id,
    })

    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Invalid refresh token',
      })
    }
    const accessToken = generateAccessToken(user, jwtSecret)

    return {
      accessToken,
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    throw createError({
      statusCode: 500,
      message: errorMsgs.public.unknown,
    })
  }
})
