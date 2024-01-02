import { Category } from '@prisma/client'
import z from 'zod'

const categoryValues = [...Object.values(Category)] as [Category, ...Category[]]

export const baseEntitiesApiInput = z.object({
  category: z.enum([...categoryValues]),
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
