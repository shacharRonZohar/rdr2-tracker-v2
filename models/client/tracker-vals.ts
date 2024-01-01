import { Category, type BaseEntity, SubCategory } from '@prisma/client'

import {
  defaultTrackerValsIdentifierMap,
  defaultCategoriesTrackerValsIdentifierMap,
} from '~/consts'
import type { FlattenDeepObject, LiteralObjectToRaw } from '../shared/util'

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
 * Value type of the `DefaultTrackerValsIdentifierMap`.
 */
export type DefaultTrackerValsIdentifierMapValue =
  DefaultTrackerValsIdentifierMap[DefaultTrackerValsIdentifierMapKey]

/**
 * Type representing the structure of the `defaultCategoriesTrackerValsIdentifierMap`.
 */
export type DefaultCategoriesTrackerValsIdentifierMap =
  typeof defaultCategoriesTrackerValsIdentifierMap

/**
 * Key type of the `DefaultCategoriesTrackerValsIdentifierMap`.
 */
export type DefaultCategoriesTrackerValsIdentifierMapKey =
  keyof DefaultCategoriesTrackerValsIdentifierMap

/**
 * Value type of the `DefaultCategoriesTrackerValsIdentifierMap`.
 */
export type DefaultCategoriesTrackerValsIdentifierMapValue =
  DefaultCategoriesTrackerValsIdentifierMap[DefaultCategoriesTrackerValsIdentifierMapKey]

/**
 * Type representing the tracker values as raw literals.
 */
export type TrackerValues = LiteralObjectToRaw<DefaultTrackerValsIdentifierMap>

/**
 * Type representing tracker values for a specific category and identifier.
 * It uses raw literal types and flattens the object structure.
 */
export type TrackerValue<
  C extends Category,
  N extends keyof DefaultTrackerValsIdentifierMap
> = LiteralObjectToRaw<
  FlattenDeepObject<{
    [K in keyof DefaultCategoriesTrackerValsIdentifierMap[C]]: DefaultTrackerValsIdentifierMap[N]
  }>
>
