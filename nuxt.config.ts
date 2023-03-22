// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/supabase"],
  css: ["@/assets/css/main.css"],
  runtimeConfig: {
    public: {
      email: process.env.EMAIL,
      password: process.env.PASSWORD,
      admin: process.env.ADMIN,
    },
    private: {
      supabase: {
        key: process.env.SUPABASE_SERVICE_KEY,
      },
    },
  },
});
