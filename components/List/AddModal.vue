<template>
  <div
    @click="closeModal"
    class="fixed top-0 bottom-0 w-full h-full bg-black text-white bg-opacity-70 z-20">
    <div
      @click.stop
      class="relative top-1/4 w-1/3 mx-auto rounded-xl bg-primery-color p-3 shadow-2xl shadow-black">
      <div class="flex flex-col">
        <div
          class="flex justify-between items-center border-b pb-0.5 border-white">
          <h1 class="text-2xl font-bold w-full mr-3">Add New Borrower</h1>
          <ClientOnly
            ><font-awesome-icon
              @click="closeModal"
              class="transition-all duration-500 ease-in-out text-white w-8 h-8 ml-3 hover:text-red-600 font-bold cursor-pointer"
              icon="fa-solid fa-xmark"
          /></ClientOnly>
        </div>
        <div class="flex flex-col">
          <label class="mt-3 mb-0.5 text-xl font-semibold" for="EIK">EIK</label>
          <input
            type="text"
            class="bg-white text-black border-0 rounded-lg h-7 focus:ring-primery-color focus:border-primery-color p-2"
            v-model="newBorrower.EIK"
            placeholder="XXXXXXXXX" />
          <label class="mt-3 mb-0.5 text-xl font-semibold" for="Company Name"
            >Company Name</label
          >
          <input
            type="text"
            class="bg-white text-black border-0 rounded-lg h-7 focus:ring-primery-color focus:border-primery-color p-2"
            v-model="newBorrower.company_name"
            placeholder="Company Name" />

          <div class="flex justify-around items-center">
            <button
              @click="addNewBorrower"
              class="bg-blue-500 rounded-2xl font-semibold text-2xl text-white py-0.5 px-8 mt-5 transition-all duration-500 ease-in-out hover:animate-pulse">
              Save
            </button>
            <button
              @click="closeModal"
              class="bg-red-500 rounded-2xl font-semibold text-2xl text-white py-0.5 px-8 mt-5 transition-all duration-500 ease-in-out hover:animate-pulse">
              Cancel
            </button>
          </div>
          <p
            class="text-red-500 text-lg text-center font-semibold mt-3 whitespace-nowrap">
            {{ errorMessage }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  const emits = defineEmits(["close"]);
  const newBorrower = reactive({
    EIK: "",
    company_name: "",
  });
  const errorMessage = ref("");
  const closeModal = function () {
    errorMessage.value = "";
    emits("close");
  };
  const addNewBorrower = async function () {
    const { error, validationError } = await $fetch("/api/companies/add", {
      method: "POST",
      body: {
        ...newBorrower,
      },
      headers: {
        Authorization: useRuntimeConfig().public.token,
      },
    });
    if (!error && !validationError) {
      errorMessage.value = "";
      emits("close");
    } else {
      errorMessage.value =
        validationError?.details[0].message || error?.message;
    }
  };
</script>
<style></style>
