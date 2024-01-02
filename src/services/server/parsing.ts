import type z from 'zod'

export async function parseBody<U extends z.ZodRawShape>(
  ev: Parameters<Parameters<typeof defineEventHandler>[0]>[0],
  schema: z.ZodObject<U>
) {
  const body = await readBody(ev)
  if (!body) throw new Error('No body')
  const parseBody = schema.safeParse(body)
  if (!parseBody.success) {
    throw new Error(parseBody.error.message)
  }
  return parseBody.data
}
