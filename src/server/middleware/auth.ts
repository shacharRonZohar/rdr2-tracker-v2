import { decodeToken, generateToken } from '~/services/server/jwt'

declare module 'h3' {
  interface H3EventContext {
    userId: null | string
  }
}

export default defineEventHandler(ev => {
  ev.context.userId = null
  const accessJwt = getCookie(ev, 'access')
  if (!accessJwt) {
    return
  }
  const { jwtSecret } = useRuntimeConfig()
  const decodedAccessToken = decodeToken(accessJwt, jwtSecret)
  let id = decodedAccessToken?.id
  if (!id) {
    const refreshJwt = getCookie(ev, 'refresh')
    if (!refreshJwt) {
      return
    }
    const decodedRefreshToken = decodeToken(refreshJwt, jwtSecret)
    if (!decodedRefreshToken?.id) {
      return
    }
    const newToken = generateToken(
      { id: decodedRefreshToken.id },
      jwtSecret,
      '7d'
    )

    const newRefreshToken = generateToken(
      { id: decodedRefreshToken.id },
      jwtSecret,
      '30d'
    )

    setCookie(ev, 'access', newToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days,
      sameSite: 'strict',
      secure: true,
    })

    setCookie(ev, 'refresh', newRefreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days,
      sameSite: 'strict',
      secure: true,
    })
    id = decodedRefreshToken.id
  }

  ev.context.userId = id
})
