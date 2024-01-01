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

/**
 * Generic interface for base entities with category and subcategory information.
 */
export interface GenericBaseEntity<
  C extends Category,
  SC extends SubCategory | null = null
> extends BaseEntity {
  category: C
  categoryId: string
  subCategory: SC
  subCategoryId: SC extends null ? null : string
}

/**
 * Interface for base entities with tracker values.
 * It extends `GenericBaseEntity` and adds `trackerVals`, which represents tracking information
 * based on the category and subcategory.
 */
export interface BaseEntityWithTrackerVals<
  C extends Category,
  SC extends SubCategory | null = null
> extends GenericBaseEntity<C, SC> {
  trackerVals: SC extends keyof DefaultCategoriesTrackerValsIdentifierMap[C]
    ? FlattenDeepObject<{
        [K in keyof DefaultCategoriesTrackerValsIdentifierMap[C][SC]]: TrackerValue<
          C,
          // TODO: Figure out how to prevent this error, the type seems to be working even though it's throwing an error
          // @ts-expect-error
          DefaultCategoriesTrackerValsIdentifierMap[C][SC][K]
        >
      }>
    : keyof DefaultCategoriesTrackerValsIdentifierMap[C] extends infer N extends keyof DefaultTrackerValsIdentifierMap
    ? TrackerValue<C, N>
    : never
}
