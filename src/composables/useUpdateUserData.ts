import type { UserDataItem } from '~/models/shared/data'

export function useUpdateUserData() {
  // TODO: Split this into a useCustom$Fetch composable
  const isLoading = ref(false)
  const error = ref<unknown | null>(null)
  function updateUserData(userData: UserDataItem) {
    isLoading.value = true
    return $fetch('/api/user-data/update', {
      body: userData,
      onRequestError: err => {
        error.value = err
      },
      onRequestFinished: () => {
        isLoading.value = false
      },
      onResponseError: err => {
        error.value = err
      },
      onResponseFinished: () => {
        isLoading.value = false
      },
    })
  }

  return {
    updateUserDataError: error,
    updateUserDataIsLoading: isLoading,
    updateUserData,
  }
}
