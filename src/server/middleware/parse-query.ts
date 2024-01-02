import { z } from 'zod'
import { endpointsInputSchemaMap } from '~/models/shared/schemas'
import { isKeyOf } from '~/services/shared/util'

declare module 'h3' {
  interface H3EventContext {
    query: z.infer<
      (typeof endpointsInputSchemaMap.query)[keyof typeof endpointsInputSchemaMap.query]
    >
  }
}

export default defineEventHandler(ev => {
  const { path } = ev.context
  if (!isKeyOf(endpointsInputSchemaMap.query, path)) {
    return
  }
  const schema = endpointsInputSchemaMap.query[path]
  const query = getQuery(ev)
  const parsedQuery = schema.safeParse(query)
  if (!parsedQuery.success) {
    throw createError({
      status: 400,
      cause: parsedQuery.error,
    })
  }
  ev.context.query = parsedQuery.data
})
