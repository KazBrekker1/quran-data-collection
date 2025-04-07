// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },

  modules: ['@nuxt/ui', '@vueuse/nuxt'],

  css: ['~/assets/css/main.css'],

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-11-27'
})