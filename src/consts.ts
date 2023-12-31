import { Category, SubCategory } from '@prisma/client'
import type { TrackerValues } from './models/shared/tracker-vals'

/**
 * A mapping of default tracker values identifiers to their respective tracking attributes.
 * Each identifier corresponds to a specific set of tracking properties.
 *
 * @constant
 */
export const defaultTrackerValsIdentifierMap = {
  0: {
    isCollected: false,
  },
  1: {
    isStudied: false,
    isTracked: false,
    isKilled: false,
    isSkinned: false,
  },
  2: {
    isPerfectSkin: false,
  },
} as const

export const allTrackerVals = {
  isCollected: false,
  isStudied: false,
  isTracked: false,
  isKilled: false,
  isSkinned: false,
  isPerfectSkin: false,
} satisfies TrackerValues
/**
 * A mapping of default categories to tracker value identifiers.
 * This provides a structure for associating categories and subcategories
 * with specific tracker values identifiers.
 *
 * @constant
 */
export const defaultCategoriesTrackerValsIdentifierMap = {
  [Category.ANIMAL]: {
    [SubCategory.DEFAULT]: { 0: 1, 1: 2 },
    [SubCategory.CRITTER]: { 0: 0 },
  },
  [Category.PLANT]: {
    [SubCategory.DEFAULT]: { 0: 0 },
  },
  [Category.LEGENDARY_ANIMAL]: {
    [SubCategory.DEFAULT]: { 0: 1 },
  },
} as const

export const categorySubCategoryMap = {
  [Category.ANIMAL]: [SubCategory.DEFAULT, SubCategory.CRITTER],
  [Category.PLANT]: [SubCategory.DEFAULT],
  [Category.LEGENDARY_ANIMAL]: [SubCategory.DEFAULT],
} as const

export const cookieNames = {
  refreshToken: 'refresh_token',
  accessToken: 'access_token',
} as const
