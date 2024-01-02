import type { Category, SubCategory } from '@prisma/client'
import { getDefaultTrackerVal } from './tracker-vals'
import type { UserData } from '~/models/shared/user-data'
import type { GenericBaseEntity } from '~/models/client/base-entity'

export function addTracskerValsToBaseEntities<
  C extends Category,
  SC extends SubCategory,
>(baseEntities: GenericBaseEntity<C, SC>[], userData: UserData) {
  return baseEntities.map(baseEntity => {
    return _addTrackerValsToBaseEntity(baseEntity, userData)
  })
}

function _addTrackerValsToBaseEntity<
  C extends Category,
  SC extends SubCategory,
>(baseEntity: GenericBaseEntity<C, SC>, userData: UserData) {
  const userDataTrackerVals = userData.find(
    userData => userData.id === baseEntity.id
  )?.trackerVals
  const trackerVals =
    userDataTrackerVals ??
    getDefaultTrackerVal(baseEntity.category, baseEntity.subCategory)
  return {
    ...baseEntity,
    ...trackerVals,
  }
}
