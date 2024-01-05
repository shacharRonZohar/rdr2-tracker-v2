import type z from 'zod'
import { httpErrors } from '~/consts/errors/http'
import type { ExtractedH3Event } from '~/models/server/h3'

export async function parseBody<U extends z.ZodRawShape>(
  ev: ExtractedH3Event,
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

export function parseQuery<U extends z.ZodRawShape>(
  ev: ExtractedH3Event,
  schema: z.ZodObject<U>
) {
  const query = getQuery(ev)
  const parsedQuery = schema.safeParse(query)
  if (!parsedQuery.success) {
    throw httpErrors.public.parsingError(parsedQuery.error.message)
  }
  return parsedQuery.data
}
