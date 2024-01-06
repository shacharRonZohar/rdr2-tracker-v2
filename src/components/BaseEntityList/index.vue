<template>
  <BaseEntityListItem
    v-for="baseEntity in props.baseEntities"
    :key="baseEntity.id"
    :base-entity="baseEntity"
  />
</template>

<script setup lang="ts" generic="BE extends BaseEntityWithAnyTrackerVals[]">
import type { BaseEntityWithAnyTrackerVals } from '~/models/client/base-entity'

// Generic props with complex types seem to be broken, so we need to use props.baseEntity in the template for now
// TODO: Check if this is a problem with Nuxt / Vue / Vite / Volar or if it's a bug in my code
const props = defineProps<{
  baseEntities: BE
}>()
</script>
