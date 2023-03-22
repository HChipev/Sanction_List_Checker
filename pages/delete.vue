<template>
  <div class="min-h-screen min-w-screen flex flex-col items-center">
    <div class="flex flex-col items-center">
      <h1 class="text-3xl font-bold italic text-primery-color my-5">
        All User:
      </h1>
      <Transition>
        <UserTable class="w-full px-5" />
      </Transition>
    </div>
  </div>
</template>
<script setup>
  definePageMeta({
    middleware: ["delete"],
  });
</script>
<style lang=""></style>
