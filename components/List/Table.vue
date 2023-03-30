<template>
  <div class="relative overflow-x-auto">
    <ClientOnly>
      <table
        class="w-full text-sm text-left text-gray-500 border border-primery-color">
        <thead
          class="head text-md font-semibold text-white uppercase bg-primery-color border border-primery-color">
          <tr>
            <th scope="col" class="px-6 py-3 border-x border-white">EIK</th>
            <th scope="col" class="px-6 py-3 border-x border-white">Company</th>
            <th scope="col" class="px-6 py-3 border-x border-white">
              Company Owners
            </th>
            <th scope="col" class="px-6 py-3 border-x border-white">List1</th>
            <th scope="col" class="px-6 py-3 border-x border-white">List2</th>
            <th scope="col" class="px-6 py-3 border-x border-white">List3</th>
            <th scope="col" class="px-6 py-3 border-x border-white">List4</th>
            <th scope="col" class="px-6 py-3 border-x border-white">List5</th>
            <th scope="col" class="px-6 py-3 border-x border-white">List6</th>
            <th scope="col" class="px-6 py-3 border-x border-white">List7</th>
            <th scope="col" class="px-6 py-3 border-x border-white">List8</th>
            <th scope="col" class="px-6 py-3 border-x border-white">List9</th>
            <th scope="col" class="px-6 py-3 border-x border-white">
              Last Checked
            </th>
            <th scope="col" class="px-6 py-3 border-x border-white"></th>
            <th scope="col" class="px-6 py-3 border-x border-white"></th>
          </tr>
        </thead>
        <tbody>
          <ListRow
            v-for="(company, index) in companies"
            :key="index"
            :company="company" />
        </tbody>
      </table>
    </ClientOnly>
  </div>
</template>
<script setup>
  const { data: companies } = await useAsyncData("allCompanies", async () => {
    const { data } = await $fetch("/api/companies/all", {
      headers: {
        Authorization: useRuntimeConfig().public.token,
      },
    });
    return data;
  });
</script>
<style></style>
