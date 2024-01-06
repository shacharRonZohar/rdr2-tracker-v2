import type z from 'zod'
import { httpErrors } from '~/consts/errors/http'
import type { ExtractedH3Event } from '~/models/server/h3'

export async function parseBody<U extends z.ZodType<any, any>>(
  ev: ExtractedH3Event,
  schema: U
) {
  const body = await readBody(ev)
  if (!body) throw httpErrors.public.missingBody()
  const parseBody = schema.safeParse(body)
  if (!parseBody.success) {
    throw httpErrors.public.parsingError(
      JSON.stringify(parseBody.error.flatten().fieldErrors)
    )
  }
  return parseBody.data
}

export function parseQuery<U extends z.ZodType<any, any>>(
  ev: ExtractedH3Event,
  schema: U
) {
  const query = getQuery(ev)
  const parsedQuery = schema.safeParse(query)
  if (!parsedQuery.success) {
    throw httpErrors.public.parsingError(parsedQuery.error.message)
  }
  return parsedQuery.data
}
