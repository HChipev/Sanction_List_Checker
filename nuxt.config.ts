// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/supabase"],
  css: ["@/assets/css/main.css"],
  runtimeConfig: {
    public: {
      email: process.env.EMAIL,
      password: process.env.PASSWORD,
      admin: process.env.ADMIN,
      token: process.env.TOKEN,
      apis: {
        username: process.env.APIS_USERNAME,
        password: process.env.APIS_PASSWORD,
      },
    },
    private: {
      supabase: {
        key: process.env.SUPABASE_SERVICE_KEY,
      },
    },
  },
});
