export default defineNuxtRouteMiddleware((_to, _from) => {
  const { data } = useUserSession()

  if (!data.value?.id) {
    return navigateTo('/login')
  }
})
