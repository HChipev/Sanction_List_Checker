<template>
  <div class="flex flex-col mx-auto my-auto text-white">
    <h1 class="text-3xl font-bold italic text-primery-color my-5">
      Registering New User:
    </h1>
    <form
      class="flex flex-col p-4 bg-primery-color rounded-xl shadow-gray-dark shadow-xl">
      <label class="text-lg" for="email">Email</label>
      <input
        v-model="newUser.email"
        class="text-black mt-0.5 border-0 rounded-lg h-7 focus:ring-primery-color focus:border-primery-color"
        type="email"
        placeholder="example@abc.com" />
      <label class="text-lg" for="name">Name</label>
      <input
        v-model="newUser.name"
        class="text-black mt-0.5 border-0 rounded-lg h-7 focus:ring-primery-color focus:border-primery-color"
        type="text"
        placeholder="Name" />
      <label class="text-lg mt-2" for="password">Password</label>
      <input
        v-model="newUser.password"
        class="text-black mt-0.5 border-0 rounded-lg h-7 focus:ring-primery-color focus:border-primery-color"
        type="password"
        placeholder="********" />
      <p
        v-if="errorMessage"
        class="text-red-500 text-center font-semibold mt-3">
        {{ errorMessage }}
      </p>
      <p
        v-if="successMessage"
        class="text-white text-center font-semibold mt-3">
        {{ successMessage }}
      </p>
      <button
        @click="register"
        class="px-5 py-0.5 mt-4 rounded-2xl bg-white text-primery-color text-lg"
        type="button">
        Register New User
      </button>
    </form>
  </div>
</template>
<script setup>
  import joi from "joi";
  const newUser = reactive({
    email: "",
    password: "",
    name: "",
  });
  const errorMessage = ref("");
  const successMessage = ref("");
  const register = async function () {
    const schema = joi.object({
      email: joi
        .string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "bg"] },
        })
        .required(),
      password: joi.string().min(8).required(),
      name: joi.string(),
    });

    const { error: validationError } = schema.validate(newUser);
    const { error } = !validationError
      ? await $fetch("/api/admin/users/add", {
          method: "POST",
          body: { ...newUser },
        })
      : { error: { message: "Validation Error" } };
    if (error || validationError) {
      successMessage.value = "";
      errorMessage.value = validationError?.message || error?.message;
    } else {
      errorMessage.value = "";
      successMessage.value = "User Registered Successfully";
      navigateTo("/delete");
    }
  };
</script>
<style></style>
