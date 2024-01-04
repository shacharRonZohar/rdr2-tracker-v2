<template>
  <div class="test" @click="console.log">Hi</div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['protected-route'],
})
</script>
