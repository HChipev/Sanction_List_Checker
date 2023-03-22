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
          <h1 class="text-2xl font-bold w-full mr-3">Add New Email</h1>
          <ClientOnly
            ><font-awesome-icon
              @click="closeModal"
              class="transition-all duration-300 text-white w-8 h-8 ml-3 hover:text-red-600 font-bold cursor-pointer"
              icon="fa-solid fa-xmark"
          /></ClientOnly>
        </div>
        <div class="flex flex-col">
          <label class="mt-3 mb-0.5 text-xl font-semibold" for="Email"
            >Email</label
          >
          <input
            type="text"
            class="bg-white text-black border-0 rounded-lg h-7 focus:ring-primery-color focus:border-primery-color p-2"
            v-model="newEmail"
            placeholder="exampmle@abc.com" />

          <div class="flex justify-between items-center">
            <button
              @click="addNewEmail"
              class="bg-blue-500 rounded-2xl font-semibold text-2xl text-white py-0.5 px-8 mt-5">
              Save
            </button>
            <button
              @click="closeModal"
              class="bg-red-500 rounded-2xl font-semibold text-2xl text-white py-0.5 px-8 mt-5">
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
  const newEmail = ref("");
  const errorMessage = ref("");
  const closeModal = function () {
    errorMessage.value = "";
    emits("close");
  };
  const addNewEmail = async function () {
    const { error, validationError } = await $fetch("/api/emails/add", {
      method: "POST",
      body: {
        email: newEmail.value,
      },
    });
    if (!error && !validationError) {
      errorMessage.value = "";
      emits("close");
    } else {
      console.log(validationError.details[0].message);
      errorMessage.value =
        validationError?.details[0].message || error?.message;
    }
  };
</script>
<style></style>
