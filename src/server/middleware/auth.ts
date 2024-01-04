import { cookieNames } from '~/consts'
import { httpErrors } from '~/consts/errors/http'
import { UserWithoutPasswordOrData } from '~/models/shared/user'
import { verifyToken } from '~/services/server/jwt'
import { protectedRoutes } from '~/services/server/protected-routes'
import { handleHttpServerError } from '~/services/shared/util'

declare module 'h3' {
  interface H3EventContext {
    user?: UserWithoutPasswordOrData
  }
}

export default defineEventHandler(async ev => {
  const route = ev.context.matchedRoute?.path
  if (!route || !protectedRoutes.isRouteProtected(route)) {
    return
  }

  try {
    let accessToken = getCookie(ev, cookieNames.accessToken)
    let user = null as UserWithoutPasswordOrData | null
    if (!accessToken) {
      const res = await refresh()

      if (!res || !res.accessToken || !res.decodedAccessToken) {
        throw httpErrors.public.notAuthorized()
      }
      accessToken = res.accessToken
      user = res.decodedAccessToken
    }

    const { jwtSecret } = useRuntimeConfig()
    user = verifyToken<UserWithoutPasswordOrData>(accessToken, jwtSecret)
    if (!user?.id) {
      const res = await refresh()

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
})

async function refresh() {
  const res = await $fetch('/api/auth/refresh', {
    method: 'POST',
  })

  if (!res.success) {
    return null
  }
  const { jwtSecret } = useRuntimeConfig()
  const decodedAccessToken = verifyToken<UserWithoutPasswordOrData>(
    res.accessToken,
    jwtSecret
  )

  if (!decodedAccessToken?.id) {
    return null
  }

  return { decodedAccessToken, accessToken: res.accessToken }
}
