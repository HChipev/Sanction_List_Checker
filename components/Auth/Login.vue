<template>
  <div class="flex flex-col mx-auto my-auto text-white">
    <form
      class="flex flex-col p-4 bg-primery-color rounded-xl shadow-gray-dark shadow-xl">
      <label class="text-lg" for="email">Email</label>
      <input
        class="text-black mt-0.5 border-0 rounded-lg h-7 focus:ring-primery-color focus:border-primery-color"
        type="email"
        placeholder="example@abc.com" />
      <label class="text-lg mt-2" for="password">Password</label>
      <input
        class="text-black mt-0.5 border-0 rounded-lg h-7 focus:ring-primery-color focus:border-primery-color"
        type="password"
        placeholder="********" />
      <button
        @click="logIn"
        class="px-5 py-0.5 mt-4 rounded-2xl bg-white text-primery-color text-lg"
        type="button">
        Login
      </button>
    </form>
  </div>
</template>
<script setup>
  const logIn = function () {
    console.log("login");
  };
</script>
<style></style>
