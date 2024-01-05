export function useUserData() {
  const { data, error, refresh, status, pending } = useFetch('/api/user-data')

  return {
    userData: data,
    userDataError: error,
    refreshUserData: refresh,
    userDataStatus: status,
    isUserDataPending: pending,
  }
}
