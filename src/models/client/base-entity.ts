import type { BaseEntity, Category, SubCategory } from '@prisma/client'
import type {
  DefaultCategoriesTrackerValsIdentifierMap,
  TrackerValue,
} from '../shared/tracker-vals'

/**
 * Generic interface for base entities with category and subcategory information.
 */
interface _GenericBaseEntity<C extends Category, SC extends SubCategory>
  extends BaseEntity {
  category: C
  subCategory: SC
}

export type GenericBaseEntity<
  C extends Category,
  SC extends SubCategory,
> = SC extends DefaultCategoriesTrackerValsIdentifierMap[C]
  ? _GenericBaseEntity<C, SC>
  : never

/**
 * Interface for base entities with tracker values.
 * It extends `GenericBaseEntity` and adds `trackerVals`, which represents tracking information
 * based on the category and subcategory.
 */
export type BaseEntityWithTrackerVals<
  C extends Category,
  SC extends SubCategory,
> = GenericBaseEntity<C, SC> & {
  trackerVals: TrackerValue<C, SC>
}
