import { Category, SubCategory } from '@prisma/client'

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

export const defaultCategoriesTrackerValsIdentifierMap = {
  [Category.ANIMAL]: {
    [SubCategory.DEFAULT]: { 0: 1, 1: 2 },
    [SubCategory.CRITTER]: { 0: 0 },
  },
  [Category.PLANT]: { 0: 0 },

  [Category.LEGENDARY_ANIMAL]: { 0: 1 },
} as const
