import type { EventHandler, EventHandlerRequest } from 'h3'
import { cookieNames } from '~/consts'
import { httpErrors } from '~/consts/errors/http'
import { ExtractedH3Event } from '~/models/server/h3'
import { UserWithoutPasswordOrData } from '~/models/shared/user'
import { generateAndSetNewAccessToken } from '~/services/server/auth'
import { verifyToken } from '~/services/server/jwt'
import { getUser } from '~/services/server/user'
import { handleHttpServerError } from '~/services/shared/util'

declare module 'h3' {
  interface H3EventContext {
    user: UserWithoutPasswordOrData
  }
}

export const defineProtectedHandler = <T extends EventHandlerRequest, D>(
  handler: EventHandler<T, D>
): EventHandler<T, D> =>
  defineEventHandler<T>(async ev => {
    // TODO: Clean this up

    try {
      let accessToken = getCookie(ev, cookieNames.accessToken)
      let user = null as UserWithoutPasswordOrData | null

      if (!accessToken) {
        const res = await refresh(ev)

        if (!res || !res.accessToken || !res.decodedAccessToken) {
          throw httpErrors.public.notAuthorized()
        }
        // TODO: Get rid of this casting
        accessToken = res.accessToken as string
        user = res.decodedAccessToken
      }

      const { jwtSecret } = useRuntimeConfig()
      try {
        user = verifyToken<UserWithoutPasswordOrData>(accessToken, jwtSecret)
      } catch (err) {
        console.log(err)
      }
      if (!user?.id) {
        const res = await refresh(ev)

        if (!res || !res.accessToken || !res.decodedAccessToken) {
          throw httpErrors.public.notAuthorized()
        }
        accessToken = res.accessToken
        user = res.decodedAccessToken
      }

      ev.context.user = user
    } catch (err) {
      handleHttpServerError(err)
    }
    return handler(ev)
  })

// TODO: Clean this up
async function refresh(ev: ExtractedH3Event) {
  const refreshJwt = getCookie(ev, cookieNames.refreshToken)
  if (!refreshJwt) {
    throw httpErrors.public.invalidRefreshToken()
  }
  const { jwtSecret } = useRuntimeConfig()
  const decodedRefreshToken = verifyToken<{ id: string }>(refreshJwt, jwtSecret)
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

  const decodedAccessToken = verifyToken<UserWithoutPasswordOrData>(
    accessToken,
    jwtSecret
  )

  if (!decodedAccessToken?.id) {
    return null
  }

  return { decodedAccessToken, accessToken }
}
