import { cookieNames } from '~/consts'
import { UserWithoutPasswordOrData } from '~/models/shared/user'
import { verifyToken } from '~/services/server/jwt'

declare module 'h3' {
  interface H3EventContext {
    user?: UserWithoutPasswordOrData
  }
}

export default defineEventHandler(ev => {
  const accessToken = getCookie(ev, cookieNames.accessToken)
  if (!accessToken) {
    return
  }

  const { jwtSecret } = useRuntimeConfig()
  const decodedAccessToken = verifyToken<UserWithoutPasswordOrData>(
    accessToken,
    jwtSecret
  )
  if (!decodedAccessToken?.id) {
    return
  }
  ev.context.user = decodedAccessToken
})
