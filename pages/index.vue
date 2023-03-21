<template>
  <div class="min-h-screen min-w-screen flex flex-col items-center">
    <div class="flex flex-col">
      <h1 class="text-3xl font-bold italic text-primery-color my-5">
        Email notifications to:
      </h1>
      <Transition>
        <EmailTable class="w-full px-5" />
      </Transition>
      <Transition>
        <p v-if="errorMessage" class="text-red-500 text-2xl font-semibold mt-4">
          {{ errorMessage }}
        </p>
      </Transition>
      <Transition>
        <p
          v-if="successMessage"
          class="text-green-500 text-2xl font-semibold mt-4">
          {{ successMessage }}
        </p>
      </Transition>
      <button
        @click="openedModal = true"
        class="rounded-2xl bg-primery-color text-white text-3xl font-semibold mx-6 py-0.5 my-5 flex justify-center items-center">
        Add Email
        <ClientOnly
          ><font-awesome-icon class="w-8 h-8 ml-2" icon="fa-solid fa-plus"
        /></ClientOnly>
      </button>
    </div>
    <Transition>
      <EmailAddModal v-if="openedModal" @close="openedModal = false" />
    </Transition>
  </div>
</template>
<script setup>
  const openedModal = ref(false);
  const errorMessage = ref("");
  const successMessage = ref("");
</script>
<style></style>
