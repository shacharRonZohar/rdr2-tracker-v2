export function useBaseEntities() {
  return useQuery({
    queryKey: ['base-entities'],
    queryFn: () => $fetch('/api/base-entity'),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}
