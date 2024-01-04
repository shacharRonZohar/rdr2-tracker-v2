export default defineNuxtRouteMiddleware((_to, _from) => {
  const { accessToken } = useAccessToken()
  if (accessToken.value) {
    return
  }
  return navigateTo('/login')
})
