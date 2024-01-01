import { Category } from '@prisma/client'
import z from 'zod'

const categoryValues = [...Object.values(Category)] as [Category, ...Category[]]

export const baseEntitiesApiInput = z.object({
  category: z.enum([...categoryValues]),
})

// Find a way to infer this map from the Nuxt generated endpoints, it should be possible because we have endpoint typesafety in $fetch

export const endpointsInputSchemaMap = {
  '/api/base-entity': baseEntitiesApiInput,
} as const
