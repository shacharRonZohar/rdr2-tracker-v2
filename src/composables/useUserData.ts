export function useUserData() {
  const { data, error, refresh, status, pending } = useFetch('/api/user-data', {
    method: 'GET',
  })

  return {
    userData: data,
    userDataError: error,
    refreshUserData: refresh,
    userDataStatus: status,
    isUserDataPending: pending,
  }
}
