export function useCallbackUrl() {
  const route = useRoute()
  const callBackUrl = computed(() => {
    return route.query?.callBackUrl && !Array.isArray(route.query.callBackUrl)
      ? route.query.callBackUrl
      : null
  })

  return {
    callBackUrl,
  }
}
