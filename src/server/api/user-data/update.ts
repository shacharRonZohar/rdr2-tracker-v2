import { z } from 'zod'
import { allTrackerVals } from '~/consts'
import { dataItemInputSchema } from '~/models/shared/schemas'
import { TrackerValues } from '~/models/shared/tracker-vals'
import { parseBody } from '~/services/server/parsing'
import { addUserDataItem } from '~/services/server/user'
import { handleHttpServerError } from '~/services/shared/util'

export default defineProtectedHandler(async ev => {
  try {
    const userId = ev.context.user.id
    const inputObj = {} as TrackerValues
    for (const trackerVal in allTrackerVals) {
      inputObj[trackerVal] = z.boolean().optional()
    }

    const dataItem = await parseBody(ev, dataItemInputSchema)
    return addUserDataItem(ev.context.prisma, userId, dataItem)
  } catch (err) {
    handleHttpServerError(err)
  }
})
