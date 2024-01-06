<template>
  <article class="base-entity">
    <header class="base-entity-header">
      <h3>
        {{ props.baseEntity.name }}
      </h3>
      <h4>{{ props.baseEntity.category }} - {{ subCategory }}</h4>
    </header>
  </article>
  {{ props.baseEntity.trackerValues }}
</template>

<script setup lang="ts" generic="BE extends BaseEntityWithAnyTrackerVals">
import { SubCategory } from '@prisma/client'
import type { BaseEntityWithAnyTrackerVals } from '~/models/client/base-entity'

// Generic props with complex types seem to be broken, so we need to use props.baseEntity in the template for now
// TODO: Check if this is a problem with Nuxt / Vue / Vite / Volar or if it's a bug in my code
const props = defineProps<{
  baseEntity: BE
}>()

const subCategory = computed(() =>
  props.baseEntity.subCategory === SubCategory.DEFAULT
    ? ''
    : props.baseEntity.subCategory
)
</script>
