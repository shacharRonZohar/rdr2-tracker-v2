<template>
  <div>
    <div v-if="isLoginPending">Loading...</div>
    <div v-else-if="loginError">Error: {{ loginError }}</div>
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
const {
  mutateAsync: login,
  isPending: isLoginPending,
  error: loginError,
} = useLogin()

const email = ref('')
const password = ref('')
function onLogin() {
  login({
    email: email.value,
    password: password.value,
  })
}
</script>
