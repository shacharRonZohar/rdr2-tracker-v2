<template>
  <div>
    <div v-if="isPending">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <form @submit.prevent="onLogin">
      <input id="email" v-model="email" type="email" name="email" />
      <input id="password" v-model="password" type="password" name="password" />
      <button>Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['non-auth-only'],
})
const { mutateAsync, isPending, error } = useLogin()

const email = ref('')
const password = ref('')
function onLogin() {
  mutateAsync({
    email: email.value,
    password: password.value,
  })
}
</script>
