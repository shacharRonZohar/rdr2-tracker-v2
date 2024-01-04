export default defineNuxtRouteMiddleware((to, _from) => {
  const { accessToken } = useAccessToken()

  if (accessToken.value) {
    return
  }
  return navigateTo('/auth/login?callBackUrl=' + to.fullPath)
})
