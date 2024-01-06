<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLink to="/">Home</NuxtLink>
    <NuxtLink to="/auth/login">Login</NuxtLink>
    <NuxtLink to="/auth/signup">Signup</NuxtLink>
    <NuxtLink to="/test">Test</NuxtLink>
    <NuxtPage />
  </div>
</template>

<style lang="scss">
@use '~/assets/styles/normalize.scss';
</style>
