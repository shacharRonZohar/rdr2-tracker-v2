export type ExtractedH3Event = Parameters<
  Parameters<typeof defineEventHandler>[0]
>[0]
