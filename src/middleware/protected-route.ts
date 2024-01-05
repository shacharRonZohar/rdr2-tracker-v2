export default defineNuxtRouteMiddleware(async (to, _from) => {
  if (process.server) return
  const { accessToken } = useAccessToken()

  if (accessToken.value) {
    return
  }

  try {
    await $fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
      // mode: 'cors',
    })
  } catch (err) {
    console.log(err)
    return navigateTo('/auth/login?callBackUrl=' + to.fullPath)
  }
})
