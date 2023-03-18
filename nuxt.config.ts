// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/supabase"],
  css: ["@/assets/css/main.css"],
  runtimeConfig: {
    public: {
      email: process.env.EMAIL,
      password: process.env.PASSWORD,
    },
  },
});
