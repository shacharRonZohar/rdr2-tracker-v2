import { Category } from '@prisma/client'
import {
  defaultCategoriesTrackerValsIdentifierMap,
  defaultTrackerValsIdentifierMap,
} from '~/consts'
import { isKeyOf } from '~/services/shared/util'

export function getDefaultTrackerVal<
  C extends Category,
  SC extends keyof (typeof defaultCategoriesTrackerValsIdentifierMap)[C]
>(category: C, subCategory?: SC) {
  // TODO: Get rid of this any
  let identifiers = defaultCategoriesTrackerValsIdentifierMap[category] as any
  if (subCategory) {
    identifiers = identifiers[subCategory]
  }
  if (!Array.isArray(identifiers)) {
    throw new Error('Identifiers should be an array')
  }
  // This casting to as number[] is necessary because of the previous any cast, should be removed when that is removed
  return (identifiers as number[]).reduce((acc, identifier) => {
    if (!isKeyOf(defaultTrackerValsIdentifierMap, identifier)) {
      // This check is mostly for TS
      // TODO: Check if this is necessary
      throw new Error(
        `Identifier ${identifier} not found in defaultTrackerValsIdentifierMap`
      )
    }
    return {
      ...acc,
      ...defaultTrackerValsIdentifierMap[identifier],
    }
  }, {})
}
