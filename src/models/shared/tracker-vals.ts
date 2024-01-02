import { Category } from '@prisma/client'

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
export type TrackerValues = LiteralObjectToRaw<
  DefaultTrackerValsIdentifierMap[DefaultTrackerValsIdentifierMapKey]
>

/**
 * Type representing tracker values for a specific category and identifier.
 * It uses raw literal types and flattens the object structure.
 */
export type TrackerValue<
  C extends Category,
  N extends keyof DefaultTrackerValsIdentifierMap,
> = LiteralObjectToRaw<
  FlattenDeepObject<{
    [K in keyof DefaultCategoriesTrackerValsIdentifierMap[C]]: DefaultTrackerValsIdentifierMap[N]
  }>
>
