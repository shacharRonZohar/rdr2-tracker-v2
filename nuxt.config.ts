// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },
  modules: ['@hebilicious/vue-query-nuxt'],
  srcDir: 'src',
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
  },
})
