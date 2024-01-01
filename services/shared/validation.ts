import z from 'zod'

export function validate<T>(schema: z.ZodSchema<T>, value: unknown) {
  return schema.safeParse(value)
}
