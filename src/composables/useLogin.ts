import type { z } from 'zod'
import type { loginApiInput } from '~/models/shared/schemas'

export function useLogin() {
  const router = useRouter()
  const { callBackUrl } = useCallbackUrl()

  return useMutation({
    mutationKey: ['login'],
    mutationFn: (data: z.infer<typeof loginApiInput>) => {
      return $fetch('/api/auth/login', {
        method: 'POST',
        body: data,
      })
    },
    onSuccess: () => {
      router.push(callBackUrl.value ?? '/')
    },
  })
}
