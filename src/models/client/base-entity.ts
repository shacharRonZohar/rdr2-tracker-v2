import type { BaseEntity, Category, SubCategory } from '@prisma/client'
import type { FlattenDeepObject } from '../shared/util'
import type {
  DefaultCategoriesTrackerValsIdentifierMap,
  DefaultTrackerValsIdentifierMap,
  TrackerValue,
} from '../shared/tracker-vals'

/**
 * Generic interface for base entities with category and subcategory information.
 */
export interface GenericBaseEntity<
  C extends Category,
  SC extends SubCategory | null = null,
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
  SC extends SubCategory | null = null,
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
    : keyof DefaultCategoriesTrackerValsIdentifierMap[C] extends infer N extends
          keyof DefaultTrackerValsIdentifierMap
      ? TrackerValue<C, N>
      : never
}
