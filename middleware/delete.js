export default defineNuxtRouteMiddleware((to, from) => {
  if (
    to.path === "/delete" &&
    useSupabaseUser().value.email !== useRuntimeConfig().public.admin
  ) {
    return navigateTo("/");
  }
});
