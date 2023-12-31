<template>
  <div>
    <form @submit.prevent="post">
      <input type="text" v-model="newName" />
      <button>Submit</button>
    </form>
    <div v-for="item in data">{{ item }}</div>
  </div>
</template>

<script setup lang="ts">
import type { Plant } from '@prisma/client'

const newName = ref('')

const queryClient = useQueryClient()
const { data, refetch, suspense, isLoading } = useQuery({
  queryKey: ['plant'],
  queryFn: () => $fetch('/api/plant'),
  staleTime: 1000 * 60 * 60 * 24,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
})
await suspense()

const { mutate } = useMutation({
  mutationFn: (newName: string) =>
    $fetch('/api/plant', { method: 'POST', body: { name: newName } }),
  onMutate: () => {
    // optimistic update
    queryClient.setQueryData(['plant'], (oldData: Plant[]) => [
      ...oldData,
      {
        id: Math.random() * 1000 + '',
        name: newName.value,
      },
    ])
  },
  onSuccess: () => {
    refetch()
    newName.value = ''
  },
})

async function post() {
  mutate(newName.value)
}
</script>
