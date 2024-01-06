export default defineNuxtRouteMiddleware((_to, from) => {
  if (process.server) return
  const { accessToken } = useAccessToken()
  if (!accessToken.value) {
    return
  }
  const redirectUrl = from.path ?? '/'
  return navigateTo(redirectUrl)
})
