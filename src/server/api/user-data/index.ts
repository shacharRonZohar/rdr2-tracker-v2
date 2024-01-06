import { z } from 'zod'
import { allTrackerVals } from '~/consts'
import { TrackerValues } from '~/models/shared/tracker-vals'
import { parseBody } from '~/services/server/parsing'
import { addUserDataItem } from '~/services/server/user'

export default defineProtectedHandler(async ev => {
  // export default defineProtectedHandler(async ev => {
  // const userId = 'clr0ky7tk0000pebzn4v138si'

  const userId = ev.context.user.id
  const inputObj = {} as TrackerValues
  for (const trackerVal in allTrackerVals) {
    inputObj[trackerVal] = z.boolean().optional()
  }
  const schema = z.object({
    id: z.string(),
    trackerValues: z.object({
      ...inputObj,
    }),
  })
  const dataItem = await parseBody(ev, schema)
  return addUserDataItem(ev.context.prisma, userId, dataItem)
  // const res = await getUserData(ev.context.prisma, { id })
  // if (!res?.data) {
  //   throw new Error('No data found')
  // }

  // return res.data
})
