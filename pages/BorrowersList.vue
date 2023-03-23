<template>
  <div class="min-h-screen min-w-screen flex flex-col items-center">
    <h1 class="text-3xl font-bold italic text-primery-color my-5">
      Borrowers List
    </h1>
    <div class="flex justify-between w-full">
      <div class="flex flex-col items-start px-5 justify-center w-full">
        <Transition>
          <p v-if="errorMessage" class="text-red-500 text-3xl font-semibold">
            {{ errorMessage }}
          </p>
        </Transition>
        <Transition>
          <p
            v-if="successMessage"
            class="text-green-500 text-3xl font-semibold">
            {{ successMessage }}
          </p>
        </Transition>
      </div>
      <div class="flex justify-end w-full px-5">
        <button
          @click="sendReport"
          class="rounded-2xl bg-primery-color text-white text-3xl font-semibold px-4 py-0.5 my-5 flex justify-center items-center mr-2">
          Send Email Report
          <ClientOnly
            ><font-awesome-icon class="w-8 h-8 ml-2" icon="fa-solid fa-share" />
          </ClientOnly>
        </button>
        <button
          @click="checkAll"
          class="rounded-2xl bg-primery-color text-white text-3xl font-semibold px-4 py-0.5 my-5 flex justify-center items-center mr-2">
          Check All
          <ClientOnly
            ><font-awesome-icon
              class="w-8 h-8 ml-2"
              icon="fa-solid fa-magnifying-glass"
          /></ClientOnly>
        </button>
        <button
          @click="openedModal = true"
          class="rounded-2xl bg-primery-color text-white text-3xl font-semibold px-4 py-0.5 my-5 flex justify-center items-center">
          Add New Borrower
          <ClientOnly
            ><font-awesome-icon class="w-8 h-8 ml-2" icon="fa-solid fa-plus"
          /></ClientOnly>
        </button>
      </div>
    </div>
    <ListTable class="w-full px-5" />
    <Transition>
      <ListAddModal v-if="openedModal" @close="openedModal = false" />
    </Transition>
  </div>
</template>
<script setup>
  const openedModal = ref(false);
  const errorMessage = ref("");
  const successMessage = ref("");
  const checkAll = async function () {
    const { error, error2 } = await $fetch("/api/companies/check/all", {
      headers: {
        Authorization: useRuntimeConfig().public.token,
      },
    });
    if (error) {
      errorMessage.value = error;
      successMessage.value = "";
    } else if (error2) {
      errorMessage.value = error2;
      successMessage.value = "";
    } else {
      errorMessage.value = "";
      successMessage.value = "All companies checked successfully!";
      setTimeout(() => {
        successMessage.value = "";
      }, 3000);
    }
  };
  const sendReport = async function () {
    const { error } = await $fetch("/api/companies/send-report", {
      headers: {
        Authorization: useRuntimeConfig().public.token,
      },
    });
    if (error) {
      errorMessage.value = error.message;
      successMessage.value = "";
    } else {
      errorMessage.value = "";
      successMessage.value = "Report sent successfully!";
      setTimeout(() => {
        successMessage.value = "";
      }, 3000);
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
