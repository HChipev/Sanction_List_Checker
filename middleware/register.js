export default defineNuxtRouteMiddleware((to, from) => {
  console.log(
    to.path,
    useSupabaseUser().value.email,
    useRuntimeConfig().public.admin
  );
  if (
    to.path === "/register" &&
    useSupabaseUser().value.email !== useRuntimeConfig().public.admin
  ) {
    return navigateTo("/");
  }
});
