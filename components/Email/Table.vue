<template>
  <div class="relative overflow-x-auto">
    <ClientOnly>
      <table
        class="w-full text-sm text-left text-gray-500 border border-primery-color">
        <thead
          class="text-md font-semibold text-white uppercase bg-primery-color border border-primery-color">
          <tr>
            <th scope="col" class="px-6 py-3 border-x border-white">email</th>
            <th scope="col" class="px-6 py-3 border-x border-white"></th>
          </tr>
        </thead>
        <tbody>
          <EmailRow
            v-for="(email, index) in emails"
            :key="index"
            :email="email" />
        </tbody>
      </table>
    </ClientOnly>
  </div>
</template>
<script setup>
  const { data: emails } = await useAsyncData("allEmails", async () => {
    const { data } = await $fetch("/api/emails/all");
    return data;
  });
</script>
<style></style>
