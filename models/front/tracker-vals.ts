import {
  Category,
  type $Enums,
  type BaseEntity,
  SubCategory,
} from '@prisma/client'

import {
  defaultTrackerValsIdentifierMap,
  defaultCategoriesTrackerValsIdentifierMap,
} from '~/consts'
import type {
  FlattenDeepObject,
  FlattenObject,
  LiteralObjectToRaw,
} from '../shared/util'

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

export type TrackerValues = LiteralObjectToRaw<DefaultTrackerValsIdentifierMap>

export type TrackerValue<
  C extends Category,
  N extends keyof DefaultTrackerValsIdentifierMap
> = LiteralObjectToRaw<
  FlattenDeepObject<{
    [K in keyof DefaultCategoriesTrackerValsIdentifierMap[C]]: DefaultTrackerValsIdentifierMap[N]
  }>
>

export interface GenericBaseEntity<
  C extends Category,
  SC extends SubCategory | null = null
> extends BaseEntity {
  category: C
  categoryId: string
  subCategory: SC
  subCategoryId: SC extends null ? null : string
}

export interface BaseEntityWithTrackerVals<
  C extends Category,
  SC extends SubCategory | null = null
> extends GenericBaseEntity<C, SC> {
  trackerVals2: SC extends keyof DefaultCategoriesTrackerValsIdentifierMap[C]
    ? FlattenDeepObject<{
        [K in keyof DefaultCategoriesTrackerValsIdentifierMap[C][SC]]: TrackerValue<
          C,
          //   TODO: Figure out how to prevent this error, the type seems to be working even though it's throwing an error
          DefaultCategoriesTrackerValsIdentifierMap[C][SC][K]
        >
      }>
    : keyof DefaultCategoriesTrackerValsIdentifierMap[C] extends infer N extends keyof DefaultTrackerValsIdentifierMap
    ? TrackerValue<C, N>
    : never
}

const testAnimal: BaseEntityWithTrackerVals<'ANIMAL', 'CRITTER'> = {
  id: ' 1',
  name: 'test',
  category: Category.ANIMAL,
  categoryId: '1',
  comments: [],
  createdAt: new Date(),
  subCategory: SubCategory.CRITTER,
  subCategoryId: '1',
  updatedAt: new Date(),
  trackerVals2: {
    isCollected: true,
  },
}

const testPlant: BaseEntityWithTrackerVals<'PLANT'> = {
  id: ' 1',
  name: 'test',
  category: Category.PLANT,
  categoryId: '1',
  comments: [],
  createdAt: new Date(),
  subCategoryId: null,
  subCategory: null,
  updatedAt: new Date(),
  trackerVals2: {
    isCollected: true,
    // isKilled: false,
    // test: 'test',

    // '0': {
    //   isCollected: false,
    // },
    // '1': {
    //   isStudied: false,
    //   isTracked: false,
    //   isKilled: false,
    //   isSkinned: false,
    // },
  },
}
