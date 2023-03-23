export default defineNuxtRouteMiddleware((to, from) => {
  if (
    to.path === "/register" &&
    useSupabaseUser().value.email !== useRuntimeConfig().public.admin
  ) {
    return navigateTo("/");
  }
});
