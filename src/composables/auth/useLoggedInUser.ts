export function useLoggedInUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => $fetch('/api/auth/logged-in-user'),
  })
}
