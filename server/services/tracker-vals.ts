import type { $Enums, PrismaClient } from '@prisma/client'
import {
  identifierNameMap,
  identifierValIndicator,
  indicatorMap,
} from '~/consts'

export function parseTrackerVals(
  prisma: PrismaClient,
  valToParse: { type: $Enums.ItemType; trackerVals: string[] }[]
) {
  return valToParse.map(({ type, trackerVals }) => ({
    type,
    trackerVals: trackerVals.reduce((acc, trackerVal) => {
      const [nameIdentifier, val] = trackerVal.split(',')
      const name = _getIdentifierName(type, +nameIdentifier)
      const value = _getIdentifierValIndicator(type, +nameIdentifier)

      if (!name || !value) {
        throw new Error('Invalid tracker val')
      }

      const finalVal = indicatorMap[value][+val]
      acc[name] = finalVal
      return acc
    }, {} as Record<string, any>),
  }))
}

function _getIdentifierName(type: $Enums.ItemType, identifier: number) {
  const entry = identifierNameMap[type].find(
    ({ identifier: id }) => id === identifier
  )
  if (!entry) {
    throw new Error('Invalid identifier')
  }
  return entry.name
}

function _getIdentifierValIndicator(type: $Enums.ItemType, identifier: number) {
  const entry = identifierValIndicator[type].find(({ identifiers: ids }) =>
    ids.some(id => id === identifier)
  )
  if (!entry) {
    throw new Error('Invalid identifier')
  }

  return entry.value
}
