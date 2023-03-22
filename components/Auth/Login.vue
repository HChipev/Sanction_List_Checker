<template>
  <div class="flex flex-col mx-auto my-auto text-white">
    <div class="flex justify-between">
      <div class="text-black">CFN Logo</div>
      <h1 class="text-3xl font-bold italic text-primery-color my-5">Login</h1>
    </div>
    <form
      class="flex flex-col min-w-[320px] p-4 bg-primery-color rounded-xl shadow-gray-dark shadow-xl">
      <label class="text-lg" for="email">Email</label>
      <input
        v-model="user.email"
        class="text-black mt-0.5 border-0 rounded-lg h-7 focus:ring-primery-color focus:border-primery-color"
        type="email"
        placeholder="example@abc.com" />
      <label class="text-lg mt-2" for="password">Password</label>
      <input
        v-model="user.password"
        class="text-black mt-0.5 border-0 rounded-lg h-7 focus:ring-primery-color focus:border-primery-color"
        type="password"
        placeholder="********" />
      <p
        v-if="errorMessage"
        class="text-red-500 text-center font-semibold mt-3">
        {{ errorMessage }}
      </p>
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
  const user = reactive({
    email: "",
    password: "",
  });
  const errorMessage = ref("");
  const logIn = async function () {
    const { error } = await useSupabaseAuthClient().auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });
    if (error) {
      errorMessage.value = error.message;
    } else {
      errorMessage.value = "";
      setTimeout(() => {
        navigateTo("/");
      }, 500);
    }
  };
</script>
<style></style>
