import { UserWithoutPasswordOrData } from '~/models/shared/user'
import { verifyToken } from '~/services/server/jwt'

declare module 'h3' {
  interface H3EventContext {
    user?: UserWithoutPasswordOrData
  }
}

export default defineEventHandler(ev => {
  const authHeader = getHeader(ev, 'Authorization')
  if (!authHeader) {
    return
  }
  const [type, token] = authHeader.split(' ')
  if (type !== 'Bearer') {
    return
  }
  const { jwtSecret } = useRuntimeConfig()
  const decodedAccessToken = verifyToken<UserWithoutPasswordOrData>(
    token,
    jwtSecret
  )
  if (!decodedAccessToken?.id) {
    return
  }
  ev.context.user = decodedAccessToken
})
