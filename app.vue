<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup>
  useSupabaseClient()
    .channel("refreshCompanies")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "Companies" },
      () => {
        refreshNuxtData("allCompanies");
      }
    )
    .subscribe();

  useSupabaseClient()
    .channel("refreshEmails")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "Emails" },
      () => {
        refreshNuxtData("allEmails");
      }
    )
    .subscribe();
</script>
<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  .page-enter-active,
  .page-leave-active {
    transition: all 0.2s ease-in-out;
  }
  .page-enter-from,
  .page-leave-to {
    opacity: 0;
  }
</style>
