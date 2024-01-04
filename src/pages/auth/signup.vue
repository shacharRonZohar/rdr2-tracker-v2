<template>
  <div>
    <div v-if="isPending">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <form @submit.prevent="onSignup">
      <input id="user-name" v-model="userName" type="text" name="user-name" />
      <input id="email" v-model="email" type="email" name="email" />
      <input id="password" v-model="password" type="password" name="password" />
      <button>signup</button>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['non-auth-only'],
})
const { mutateAsync, isPending, error } = useSignup()

const userName = ref('')
const email = ref('')
const password = ref('')
function onSignup() {
  mutateAsync({
    email: email.value,
    password: password.value,
    userName: userName.value,
  })
}
</script>
