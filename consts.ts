import { $Enums } from '@prisma/client'

export const identifierNameMap = {
  [$Enums.ItemType.ANIMAL]: [{ identifier: 0, name: 'isKilled' }],
} as const

export const identifierValIndicator = {
  [$Enums.ItemType.ANIMAL]: [{ identifiers: [0], value: 'boolean' }],
} as const

export const indicatorMap = {
  boolean: [false, true],
} as const
