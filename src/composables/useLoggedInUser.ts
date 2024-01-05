import type { UserWithoutPasswordOrData } from '~/models/shared/user'
import { unsafeDecode } from '~/services/client/jwt'

export function useLoggedInUser() {
  const { accessToken } = useAccessToken()

  const user = computed(() => {
    if (!accessToken.value) {
      return null
    }
    return unsafeDecode<UserWithoutPasswordOrData>(accessToken.value)
  })

  return {
    user,
  }
}
