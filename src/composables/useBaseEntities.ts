export function useBaseEntities() {
  const { data, error, refresh, status, pending } = useFetch(
    '/api/base-entity',
    {
      method: 'GET',
    }
  )
  return {
    baseEntities: data,
    baseEntitiesError: error,
    refreshBaseEntities: refresh,
    baseEntitiesStatus: status,
    isBaseEntitiesPending: pending,
  }
}
