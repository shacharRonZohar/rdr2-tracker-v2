import { Category } from '@prisma/client'
import {
  categoriesWithSubCategories,
  defaultCategoriesTrackerValsIdentifierMap,
  defaultTrackerValsIdentifierMap,
} from '~/consts'
import type {
  DefaultTrackerValsIdentifierMapKey,
  TrackerValue,
} from '~/models/shared/tracker-vals'

// This is a godforsaked module, made of the most horrific code you can imagine, leave, for your own sanity
export function getDefaultTrackerVal(
  category: Category,
  subCategory: keyof (typeof defaultCategoriesTrackerValsIdentifierMap)[Category]
) {
  // TODO: Find a better way to do this, maybe through typesafety
  // fix this includes type error, which is dumb and shouldn't exist
  if (subCategory && !categoriesWithSubCategories.includes(category)) {
    throw new Error(
      'This category does not have subcategories, but a subcategory was provided'
    )
  }

  const identifiers = subCategory
    ? defaultCategoriesTrackerValsIdentifierMap[category][subCategory]
    : defaultCategoriesTrackerValsIdentifierMap[category]

  // TODO: get rid of this terrible casting and find a better way to do this
  return Object.values(
    identifiers as unknown as DefaultTrackerValsIdentifierMapKey[]
  ).reduce((acc, identifier) => {
    return {
      ...acc,
      ...defaultTrackerValsIdentifierMap[identifier],
    }
  }, {}) as TrackerValue<Category, any>
}

// These functions exist because sometimes TS is an asshole, and I was trying to make it not be an asshole, but failed spectacularly.
// I'm leaving them here, because I'm not sure if I'll need them again, and I don't want to go through the pain of writing them again.
// They are a testament to my failure, and I'm not proud of them.

// Add to this counter for every time you came here trying to fix it, and everything went crazy:
// 6

// function isCategoryNotWithSubCategories(
//   category: Category
// ): category is Exclude<Category, (typeof categoriesWithSubCategories)[number]> {
//   // @ts-ignore
//   return !categoriesWithSubCategories.includes(category)
// }

// function isCategoryWithSubCategories(
//   category: Category
// ): category is (typeof categoriesWithSubCategories)[number] {
//   // @ts-ignore
//   return categoriesWithSubCategories.includes(category)
// }

// function throwNew() {
//   throw new Error(
//     'You fucked up if you managed to get here, go back to voodo land'
//   )
// }

// type BET<T> = T extends readonly (infer U)[] ? U[] : never

// const testArr = [
//   {
//     category: 'ANIMAL',
//     comments: [],
//     createdAt: new Date(),
//     id: '1',
//     name: 'Dog',
//     subCategory: 'DEFAULT',
//     updatedAt: new Date(),
//   },
//   {
//     category: 'PLANT',
//     comments: [],
//     createdAt: new Date(),
//     id: '2',
//     name: 'Tree',
//     updatedAt: new Date(),
//     subCategory: null,
//   },
// ] as const
// const test = addTrackerValsToBaseEntities<typeof testArr>([], [])
// export function addTrackerValsToBaseEntities<BE extends BaseEntity[]>(
//   userData: UserData,
//   baseEntities: BE
// ) {

//     const res = baseEntities.map((baseEntity) => {
//       let trackerVals =null satisfies TrackerValues[] | null
//       if(!baseEntity.subCategory){
//         trackerVals = getDefaultTrackerVal(baseEntity.category)
//       }
//      const userDataItem = userData.find(
//         (userDataItem) => userDataItem.id === baseEntity.id
//       )

//       return {
//         ...baseEntity,
//         ...trackerVals,
//       }
//     }
// }

// export function getDefaultTrackerVal<
//   C extends Category,
//   SC extends keyof (typeof defaultCategoriesTrackerValsIdentifierMap)[C],
// >(category: C, subCategory: SC | null = null) {
//   const identifiers = isCategoryNotWithSubCategories(category)
//     ? defaultCategoriesTrackerValsIdentifierMap[category]
//     : isCategoryWithSubCategories(category) &&
//         subCategory &&
//         subCategory in defaultCategoriesTrackerValsIdentifierMap[category]
//       ? defaultCategoriesTrackerValsIdentifierMap[category][subCategory]
//       : throwNew()
//   if (!identifiers) throw new Error('wtf?')

//   return Object.values(identifiers).reduce((acc, identifier) => {
//     return {
//       ...acc,
//       ...defaultTrackerValsIdentifierMap[identifier],
//     }
//   }, {})
