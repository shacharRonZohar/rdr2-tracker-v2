<template>
  <!-- <div class="test" @click="console.log">Hi</div> -->
  <div>
    <button @click="refreshUserData">Refetch</button>
    <div v-if="isUserDataPending">Loading...</div>
    <div v-else-if="userDataError">Error: {{ userDataError }}</div>
    <div v-else-if="userData">
      {{ userData }}
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['protected-route'],
})

const { isUserDataPending, refreshUserData, userData, userDataError } =
  useUserData()
// const { data, isLoading, error, refetch } = useQuery({
//   queryKey: ['userData'],
//   queryFn: async () => {
//     console.log('fetching')
//     const res = await $fetch('/api/user-data', {
//       credentials: 'include',
//     })
//     console.log('fetched')
//     console.log(res)
//     return res
//   },

//   staleTime: 1000 * 60 * 60,
//   refetchOnMount: false,
//   refetchOnWindowFocus: false,
//   retry: false,
// })
</script>
