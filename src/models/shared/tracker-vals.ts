import type { Category, SubCategory } from '@prisma/client'

import type { FlattenDeepObject, LiteralObjectToRaw } from './util'
import {
  defaultTrackerValsIdentifierMap,
  defaultCategoriesTrackerValsIdentifierMap,
} from '~/consts'

/**
 * Type representing the structure of the `defaultTrackerValsIdentifierMap`.
 */
export type DefaultTrackerValsIdentifierMap =
  typeof defaultTrackerValsIdentifierMap

/**
 * Key type of the `DefaultTrackerValsIdentifierMap`.
 */
export type DefaultTrackerValsIdentifierMapKey =
  keyof DefaultTrackerValsIdentifierMap

/**
 * Type representing the structure of the `defaultCategoriesTrackerValsIdentifierMap`.
 */
export type DefaultCategoriesTrackerValsIdentifierMap =
  typeof defaultCategoriesTrackerValsIdentifierMap

/**
 * Type representing the tracker values as raw literals.
 */
export type TrackerValues = LiteralObjectToRaw<
  DefaultTrackerValsIdentifierMap[DefaultTrackerValsIdentifierMapKey]
> & {
  // [Symbol.iterator]: () => IterableIterator<keyof TrackerValues>
  [index: string]: any
}

/**
 * Type representing tracker values for a specific category and subCategory.
 * It uses raw literal types and flattens the object structure.
 */

export type TrackerValue<
  C extends Category,
  SC extends SubCategory,
> = SC extends keyof DefaultCategoriesTrackerValsIdentifierMap[C]
  ? LiteralObjectToRaw<
      FlattenDeepObject<{
        [K in keyof DefaultCategoriesTrackerValsIdentifierMap[C][SC]]: DefaultCategoriesTrackerValsIdentifierMap[C][SC][K] extends keyof DefaultTrackerValsIdentifierMap
          ? DefaultTrackerValsIdentifierMap[DefaultCategoriesTrackerValsIdentifierMap[C][SC][K]]
          : never
      }>
    >
  : never
