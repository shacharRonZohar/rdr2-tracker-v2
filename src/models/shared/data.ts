import type { TrackerValues } from './tracker-vals'
import type { Optional } from './util'

export interface UserDataItem {
  // This index is necessary for prisma to be happy, coming from the Prisma.InputJsonValue type.
  [key: string]: string | Optional<TrackerValues>
  id: string
  trackerValues: Optional<TrackerValues>
}
