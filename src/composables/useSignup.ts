import type { z } from 'zod'
import type { signupApiInput } from '~/models/shared/schemas'

export function useSignup() {
  const router = useRouter()
  const { callBackUrl } = useCallbackUrl()
  const { mutateAsync } = useLogin()
  return useMutation({
    mutationKey: ['signup'],
    mutationFn: (data: z.infer<typeof signupApiInput>) => {
      return $fetch('/api/auth/signup', {
        method: 'POST',
        body: data,
      })
    },
    onSuccess: async (data, input) => {
      if (!data.success) return
      await mutateAsync({
        email: input.email,
        password: input.password,
      })
      router.push(callBackUrl.value ?? '/')
    },
  })
}
