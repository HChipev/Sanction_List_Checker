<template>
  <div class="min-h-screen min-w-screen flex flex-col items-center">
    <AuthRegister />
  </div>
</template>
<script setup>
  definePageMeta({
    middleware: ["register"],
  });
</script>
<style></style>
