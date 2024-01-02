import { decodeToken, generateToken } from '~/services/server/jwt'

declare module 'h3' {
  interface H3EventContext {
    isLoggedIn: boolean
  }
}

export default defineEventHandler(ev => {
  const jwt = getCookie(ev, 'user')
  if (!jwt) {
    ev.context.isLoggedIn = false
    return
  }
  const { jwtSecret } = useRuntimeConfig()
  const decodedToken = decodeToken(jwt, jwtSecret)
  if (!decodedToken?.id) {
    ev.context.isLoggedIn = false
    return
  }
  const newToken = generateToken({ id: decodedToken.id }, jwtSecret)

  setCookie(ev, 'user', newToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30, // 30 days,
    sameSite: 'strict',
    secure: true,
  })

  ev.context.isLoggedIn = true
})
