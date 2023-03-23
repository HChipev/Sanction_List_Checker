<template>
  <div
    class="flex justify-between items-center p-4 h-14 bg-primery-color text-white">
    <div>CFN Logo</div>
    <Transition>
      <div v-if="useSupabaseUser().value" class="flex justify-around">
        <NuxtLink
          to="/"
          class="rounded-2xl font-semibold border border-gray-dark text-xl py-0.5 px-5 bg-white text-primery-color">
          Home
        </NuxtLink>
        <NuxtLink
          to="/BorrowersList"
          class="rounded-2xl font-semibold border border-gray-dark text-xl py-0.5 px-5 ml-2 bg-white text-primery-color">
          Borrowers List
        </NuxtLink>
        <NuxtLink
          v-if="
            useSupabaseUser().value.email === useRuntimeConfig().public.admin
          "
          to="/register"
          class="rounded-2xl font-semibold border border-gray-dark text-xl py-0.5 px-5 ml-2 bg-white text-primery-color">
          Register New User
        </NuxtLink>
        <NuxtLink
          v-if="
            useSupabaseUser().value.email === useRuntimeConfig().public.admin
          "
          to="/delete"
          class="rounded-2xl font-semibold border border-gray-dark text-xl py-0.5 px-5 ml-2 bg-white text-primery-color">
          Delete Users
        </NuxtLink>
        <button
          @click="logout"
          class="rounded-full font-semibold border border-gray-dark text-xl p-2 ml-2 bg-white text-primery-color">
          <ClientOnly>
            <font-awesome-icon
              class="text-primery-color h-5 w-5"
              icon="far-regular fa-arrow-right-from-bracket" />
          </ClientOnly>
        </button>
      </div>
    </Transition>
  </div>
</template>
<script setup>
  const logout = async function () {
    const { error } = await useSupabaseAuthClient().auth.signOut();
    if (!error) {
      navigateTo("/login");
    } else {
      console.log(error);
    }
  };
</script>
<style>
  .v-enter-active,
  .v-leave-active {
    transition: all 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
