export function useUserData() {
  return useQuery({
    queryKey: ['userData'],
    queryFn: () => $fetch('/api/user-data'),
    staleTime: 1000 * 60 * 60,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  })
}
