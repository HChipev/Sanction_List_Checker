<template>
  <div
    class="flex justify-between items-center p-4 h-14 bg-primery-color text-white">
    <div>CFN Logo</div>
    <div class="flex justify-around">
      <NuxtLink
        to="/"
        class="rounded-2xl font-semibold border border-gray-dark text-xl py-0.5 px-5 mr-2 bg-white text-primery-color">
        Home
      </NuxtLink>
      <NuxtLink
        to="/BorrowersList"
        class="rounded-2xl font-semibold border border-gray-dark text-xl py-0.5 px-5 ml-2 bg-white text-primery-color">
        Borrowers List
      </NuxtLink>
    </div>
  </div>
</template>
<script setup></script>
<style></style>
