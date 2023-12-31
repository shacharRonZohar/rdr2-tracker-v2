export type * from '@prisma/client'
import type { $Enums } from '@prisma/client'

import {
  defaultTrackerValsIdentifierMap,
  defaultCategoriesTrackerValsIdentifierMap,
} from '~/consts'

export type DefaultTrackerValsIdentifierMap =
  typeof defaultTrackerValsIdentifierMap
export type DefaultTrackerValsIdentifierMapKey =
  keyof DefaultTrackerValsIdentifierMap
export type DefaultTrackerValsIdentifierMapValue =
  DefaultTrackerValsIdentifierMap[DefaultTrackerValsIdentifierMapKey]

export type DefaultCategoriesTrackerValsIdentifierMap =
  typeof defaultCategoriesTrackerValsIdentifierMap
export type DefaultCategoriesTrackerValsIdentifierMapKey =
  keyof DefaultCategoriesTrackerValsIdentifierMap
export type DefaultCategoriesTrackerValsIdentifierMapValue =
  DefaultCategoriesTrackerValsIdentifierMap[DefaultCategoriesTrackerValsIdentifierMapKey]
