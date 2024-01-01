import { $Enums } from '@prisma/client'

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
  [$Enums.Category.ANIMAL]: {
    [$Enums.SubCategory.DEFAULT]: { 0: 1, 1: 2 },
    [$Enums.SubCategory.CRITTER]: { 0: 0 },
  },
  [$Enums.Category.PLANT]: { 0: 0 },

  [$Enums.Category.LEGENDARY_ANIMAL]: { 0: 1 },
} as const
