export function useLoggedInUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => $fetch('/api/auth/logged-in-user'),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
  })
}
