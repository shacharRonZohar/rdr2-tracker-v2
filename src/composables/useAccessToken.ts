import { cookieNames } from '~/consts'

export function useAccessToken() {
  const accessToken = useCookie(cookieNames.accessToken)

  return {
    accessToken,
  }
}
