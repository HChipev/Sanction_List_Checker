<template>
  <div class="min-h-screen min-w-screen flex flex-col items-center">
    <Transition>
      <AuthLogin />
    </Transition>
  </div>
</template>
<script setup></script>
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
