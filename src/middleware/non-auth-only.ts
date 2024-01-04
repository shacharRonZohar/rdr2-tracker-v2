export default defineNuxtRouteMiddleware(to => {
  const { accessToken } = useAccessToken()
  if (!accessToken.value) {
    return
  }
  const redirectUrl =
    to.query.callBackUrl && !Array.isArray(to.query.callBackUrl)
      ? to.query.callBackUrl
      : '/'
  return navigateTo(redirectUrl)
})
