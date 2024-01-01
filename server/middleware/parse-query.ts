import { Category } from '@prisma/client'
import { z } from 'zod'
import { endpointsInputSchemaMap } from '~/models/shared/schemas'
import { isKeyOf } from '~/services/shared/util'
import { validate } from '~/services/shared/validation'

// Find a way to infer this map from the Nuxt generated endpoints, it should be possible because we have endpoint typesafety in $fetch

declare module 'h3' {
  interface H3EventContext {
    query: z.infer<
      (typeof endpointsInputSchemaMap)[keyof typeof endpointsInputSchemaMap]
    >
  }
}

export default defineEventHandler(ev => {
  const { path } = ev.context
  if (!isKeyOf(endpointsInputSchemaMap, path)) {
    return
  }
  const schema = endpointsInputSchemaMap[path]
  const query = getQuery(ev)
  const parsedQuery = validate(schema, query)
  if (!parsedQuery.success) {
    throw createError({
      status: 400,
      cause: parsedQuery.error,
    })
  }
  ev.context.query = parsedQuery.data
})
