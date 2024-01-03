export function useUserSession() {
  return useQuery({
    queryKey: ['session'],
    queryFn: () => $fetch('/api/auth/verify-session'),
    // The session is cached for 1 hour to avoid hitting the database on every request
    staleTime: 1000 * 60 * 60,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}
