<template>
  <div class="min-h-screen min-w-screen flex flex-col items-center">
    <div class="flex flex-col">
      <h1 class="text-3xl font-bold italic text-primery-color my-5">
        Select time of day to send Report
      </h1>

      <input
        class="min-h-fit border border-primery-color rounded-xl text-xl mx-2 px-1 focus:focus-visible:outline-none focus:focus-visible:ring-1 focus:focus-visible:ring-primery-color"
        type="time"
        v-model="setTime" />
      <button
        type="button"
        @click="setReportTime"
        class="min-h-fit bg-primery-color border border-primery-color rounded-xl text-xl text-white mx-auto mt-3 px-5 focus:focus-visible:outline-none focus:focus-visible:ring-1 focus:focus-visible:ring-primery-color">
        Set Time
      </button>
    </div>
  </div>
</template>
<script setup>
  const setTime = ref(await $fetch("/api/schedule/time"));
  const setReportTime = async function () {
    console.log(setTime.value);
    await $fetch("/api/schedule/time", {
      method: "POST",
      body: JSON.stringify({ time: setTime.value }),
    });
  };
</script>
<style></style>
