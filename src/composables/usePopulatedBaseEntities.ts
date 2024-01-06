import type { Category, SubCategory } from '@prisma/client'
import type { BaseEntityWithAnyTrackerVals } from '~/models/client/base-entity'
import type { TrackerValue } from '~/models/shared/tracker-vals'
import { getDefaultTrackerVal } from '~/services/client/tracker-vals'

export function usePopulatedBaseEntities() {
  const { baseEntities } = useBaseEntities()
  const { userData } = useUserData()
  const populatedBaseEntities = computed(() => {
    if (!baseEntities.value || !userData.value) return null

    return baseEntities.value.map(baseEntity => {
      // TODO: Refine this type
      const userDataItem =
        (userData.value as Record<string, TrackerValue<Category, SubCategory>>)[
          baseEntity.id
        ] ?? getDefaultTrackerVal(baseEntity.category, baseEntity.subCategory)

      return {
        ...baseEntity,
        trackerValues: userDataItem,
      } as BaseEntityWithAnyTrackerVals
    })
  })
  return {
    populatedBaseEntities,
  }
}
