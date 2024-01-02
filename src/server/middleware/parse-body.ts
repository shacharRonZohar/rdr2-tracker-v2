import { z } from 'zod'
import { endpointsInputSchemaMap } from '~/models/shared/schemas'
import { isKeyOf } from '~/services/shared/util'

declare module 'h3' {
  interface H3EventContext {
    body: z.infer<
      (typeof endpointsInputSchemaMap.body)[keyof typeof endpointsInputSchemaMap.body]
    >
  }
}

export default defineEventHandler(ev => {
  const { path } = ev.context
  if (!isKeyOf(endpointsInputSchemaMap.body, path)) {
    return
  }
  const schema = endpointsInputSchemaMap.body[path]
  const body = readBody(ev)
  if (!body) return
  const parsedQuery = schema.safeParse(body)
  if (!parsedQuery.success) {
    throw createError({
      status: 400,
      cause: parsedQuery.error,
    })
  }
  ev.context.body = parsedQuery.data
})
