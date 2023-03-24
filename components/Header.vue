<template>
  <div
    class="flex justify-between items-center p-4 h-14 bg-primery-color text-white">
    <div>CFN Logo</div>
    <Transition>
      <div v-if="useSupabaseUser().value" class="flex justify-around">
        <NuxtLink
          to="/"
          class="relative text-xl inline-flex items-center justify-start px-5 py-0.5 ml-2 overflow-hidden font-bold rounded-full group">
          <span
            class="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
          <span
            class="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
          <span
            class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-primery-color"
            >Home</span
          >
          <span
            class="absolute inset-0 border-2 border-white rounded-full"></span>
        </NuxtLink>
        <NuxtLink
          to="/BorrowersList"
          class="relative text-xl inline-flex items-center justify-start px-5 py-0.5 ml-2 overflow-hidden font-bold rounded-full group">
          <span
            class="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
          <span
            class="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-4"></span>
          <span
            class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-primery-color"
            >Borrowers List</span
          >
          <span
            class="absolute inset-0 border-2 border-white rounded-full"></span>
        </NuxtLink>
        <NuxtLink
          v-if="
            useSupabaseUser().value.email === useRuntimeConfig().public.admin
          "
          to="/register"
          class="relative text-xl inline-flex items-center justify-start px-5 py-0.5 ml-2 overflow-hidden font-bold rounded-full group">
          <span
            class="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
          <span
            class="absolute top-0 left-0 w-52 h-56 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-60 -translate-y-28 bg-white opacity-100 group-hover:translate-x-4"></span>
          <span
            class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-primery-color">
            Register New User</span
          >
          <span
            class="absolute inset-0 border-2 border-white rounded-full"></span>
        </NuxtLink>
        <NuxtLink
          v-if="
            useSupabaseUser().value.email === useRuntimeConfig().public.admin
          "
          to="/delete"
          class="relative text-xl inline-flex items-center justify-start px-5 py-0.5 ml-2 overflow-hidden font-bold rounded-full group">
          <span
            class="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
          <span
            class="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
          <span
            class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-primery-color"
            >Delete Users</span
          >
          <span
            class="absolute inset-0 border-2 border-white rounded-full"></span>
        </NuxtLink>
        <button
          @click="logout"
          class="relative inline-flex items-center justify-start p-3 ml-2 overflow-hidden font-bold rounded-full group">
          <span
            class="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
          <span
            class="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
          <span
            class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-primery-color"
            ><ClientOnly>
              <font-awesome-icon
                class="h-5 w-5"
                icon="far-regular fa-arrow-right-from-bracket" /> </ClientOnly
          ></span>
          <span
            class="absolute inset-0 border-2 border-white rounded-full"></span>
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
