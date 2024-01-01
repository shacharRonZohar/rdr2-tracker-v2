import { Category } from '@prisma/client'
import z from 'zod'

const categoryValues = [...Object.values(Category)] as [Category, ...Category[]]

export const baseEntitiesApiInput = z.object({
  category: z.enum([...categoryValues]),
})

export const endpointsInputSchemaMap = {
  '/api/base-entity': baseEntitiesApiInput,
} as const
