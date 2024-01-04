<template>
  <!-- <div class="test" @click="console.log">Hi</div> -->
  <div>
    <button @click="refetch">Refetch</button>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else-if="data">
      <div>UserName: {{ data }}</div>
      <div>Email: {{ data }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['protected-route'],
})

const { data, isLoading, error, refetch } = useUserData()
</script>
