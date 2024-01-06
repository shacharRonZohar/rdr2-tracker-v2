import type {
  BaseEntity,
  Category,
  SubCategory,
  Location,
  LocationData,
} from '@prisma/client'
import type {
  DefaultCategoriesTrackerValsIdentifierMap,
  TrackerValue,
} from '../shared/tracker-vals'

export interface LocationWithLocationData extends Location {
  locationData: LocationData
}
export interface BaseEntityWithLocations extends BaseEntity {
  locations: LocationWithLocationData[]
}

/**
 * Generic interface for base entities with category and subcategory information.
 */
interface _GenericBaseEntity<C extends Category, SC extends SubCategory>
  extends BaseEntityWithLocations {
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
  trackerValues: TrackerValue<C, SC>
}
export type BaseEntityWithAnyTrackerVals = BaseEntityWithLocations & {
  trackerValues: TrackerValue<Category, SubCategory>
}
