<template>
  <BaseEntityList
    v-if="populatedBaseEntities?.length"
    :base-entities="populatedBaseEntities"
  />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['protected-route'],
})
const { populatedBaseEntities } = usePopulatedBaseEntities()
</script>
