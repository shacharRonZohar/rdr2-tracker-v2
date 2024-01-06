import type { z } from 'zod'
import type { dataItemInputSchema } from '~/models/shared/schemas'

export function useUpdateUserData() {
  return useMutation({
    mutationKey: ['updateUserData'],
    mutationFn: (data: z.infer<typeof dataItemInputSchema>) => {
      return $fetch('/api/user-data/update', {
        body: data,
      })
    },
  })
}
