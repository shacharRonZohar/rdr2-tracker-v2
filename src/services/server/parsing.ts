import type z from 'zod'
import { httpErrors } from '~/consts/errors/http'

export async function parseBody<U extends z.ZodRawShape>(
  ev: Parameters<Parameters<typeof defineEventHandler>[0]>[0],
  schema: z.ZodObject<U>
) {
  const body = await readBody(ev)
  if (!body) throw httpErrors.public.missingBody()
  const parseBody = schema.safeParse(body)
  if (!parseBody.success) {
    throw httpErrors.public.parsingError(parseBody.error.message)
  }
  return parseBody.data
}
