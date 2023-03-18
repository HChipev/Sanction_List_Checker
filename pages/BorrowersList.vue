<template>
  <div class="min-h-screen min-w-screen flex flex-col items-center">
    <h1 class="text-3xl font-bold italic text-primery-color my-5">
      Borrowers List
    </h1>
    <ListTable class="w-full px-5" />
    <button
      @click="openedModal = true"
      class="rounded-2xl bg-primery-color text-white text-3xl font-semibold px-4 py-0.5 my-5 flex justify-center items-center">
      Add New Borrower
      <ClientOnly
        ><font-awesome-icon class="w-8 h-8 ml-2" icon="fa-solid fa-plus"
      /></ClientOnly>
    </button>
    <ListAddModal v-if="openedModal" @close="openedModal = false" />
  </div>
</template>
<script setup>
  const openedModal = ref(false);
</script>
<style></style>
