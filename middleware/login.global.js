export default defineNuxtRouteMiddleware((to, _) => {
  if (!useSupabaseUser().value && to.path !== "/login") {
    return navigateTo("/login");
  } else if (useSupabaseUser().value && to.path === "/login") {
    return navigateTo("/");
  }
});
