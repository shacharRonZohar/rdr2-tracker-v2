import { Category, SubCategory } from '@prisma/client'
import z from 'zod'
import { allTrackerVals, categorySubCategoryMap } from '~/consts'

import { isObjsEqual } from '~/services/shared/util'
import { getDefaultTrackerVal } from '~/services/client/tracker-vals'

const categoryValues = [...Object.values(Category)] as [Category, ...Category[]]

export const baseEntitiesApiInput = z.object({
  category: z.enum([...categoryValues]).optional(),
})

export const signupApiInput = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  userName: z.string().min(3),
})

export const loginApiInput = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

const optionalBoolean = z.boolean().optional()
const _inputObj = {} as Record<string, typeof optionalBoolean>

for (const trackerVal in allTrackerVals) {
  _inputObj[trackerVal] = z.boolean().optional()
}
export const dataItemInputSchema = z
  .object({
    id: z.string(),
    category: z.nativeEnum(Category),
    subCategory: z.nativeEnum(SubCategory),
    trackerValues: z.object({ ..._inputObj }),
  })
  .superRefine((data, ctx) => {
    if (
      // TODO: Find a way to make includes happy with as const
      !categorySubCategoryMap[data.category].includes(data.subCategory as any)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['subCategory'],
        message: `Invalid subCategory for the selected category ${data.category}`,
      })
    }
    if (
      !isObjsEqual(
        data.trackerValues,
        getDefaultTrackerVal(data.category, data.subCategory)
      )
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['trackerValues'],
        message: `Invalid trackerValues for the selected category ${data.category} and subCategory ${data.subCategory}`,
      })
    }
  })

// Find a way to infer this map from the Nuxt generated endpoints, it should be possible because we have endpoint typesafety in $fetch

export const endpointsInputSchemaMap = {
  query: {
    '/api/base-entity': baseEntitiesApiInput,
  },
  body: {
    '/api/auth/signup': signupApiInput,
    '/api/auth/login': loginApiInput,
  },
} as const
