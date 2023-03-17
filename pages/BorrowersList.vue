<template>
  <div class="min-h-screen min-w-screen flex flex-col items-center">
    <h1 class="text-3xl font-bold italic text-primery-color my-5">
      Borrowers List
    </h1>
    <ListTable :EIK="Companies[0].EIK" class="w-full px-5" />
  </div>
</template>
<script setup>
  let { data: Companies, error } = await useSupabaseClient()
    .from("Companies")
    .select("EIK");
</script>
<style></style>
