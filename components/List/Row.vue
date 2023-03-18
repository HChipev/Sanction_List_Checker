<template>
  <tr class="bg-white border-b border-primery-color">
    <th
      scope="row"
      class="px-6 py-2 font-medium text-lg text-gray-900 whitespace-nowrap">
      {{ company.EIK }}
    </th>
    <th
      scope="row"
      class="px-6 py-2 font-medium text-lg text-gray-900 border-x border-primery-color">
      {{ company.company_name }}
    </th>
    <td class="p-2 border-x border-primery-color">
      <ClientOnly
        ><font-awesome-icon
          class="text-green-500 w-8 h-8"
          icon="fa-solid fa-check"
      /></ClientOnly>
    </td>
    <td class="p-2 border-x border-primery-color">
      <ClientOnly
        ><font-awesome-icon
          class="text-green-500 w-8 h-8"
          icon="fa-solid fa-check"
      /></ClientOnly>
    </td>
    <td class="p-2 border-x border-primery-color">
      <ClientOnly
        ><font-awesome-icon
          class="text-green-500 w-8 h-8"
          icon="fa-solid fa-check"
      /></ClientOnly>
    </td>
    <td class="p-2 border-x border-primery-color">
      <ClientOnly
        ><font-awesome-icon
          class="text-red-500 w-8 h-8"
          icon="fa-solid fa-xmark"
      /></ClientOnly>
    </td>
    <td class="p-2 border-x border-primery-color">
      <ClientOnly
        ><font-awesome-icon
          class="text-red-500 w-8 h-8"
          icon="fa-solid fa-xmark"
      /></ClientOnly>
    </td>
    <td class="p-2 border-x border-primery-color">
      <ClientOnly
        ><font-awesome-icon
          class="text-red-500 w-8 h-8"
          icon="fa-solid fa-xmark"
      /></ClientOnly>
    </td>
    <td class="p-2 border-x border-primery-color">
      <ClientOnly
        ><font-awesome-icon
          class="text-red-500 w-8 h-8"
          icon="fa-solid fa-xmark"
      /></ClientOnly>
    </td>
    <td class="p-2 border-x border-primery-color">
      <ClientOnly
        ><font-awesome-icon
          class="text-red-500 w-8 h-8"
          icon="fa-solid fa-xmark"
      /></ClientOnly>
    </td>
    <td class="px-2 py-4 border-x border-primery-color text-center">
      <button
        @click="search(company.EIK)"
        class="bg-primery-color rounded-2xl font-semibold text-2xl text-white py-0.5 px-8">
        Check
      </button>
    </td>
    <td class="px-2 py-4 border-x border-primery-color text-center">
      <button @click="deleteRow(company.EIK)" class="py-0.5">
        <ClientOnly
          ><font-awesome-icon
            class="text-red-700 w-7 h-7"
            icon="fa-solid fa-trash"
        /></ClientOnly>
      </button>
    </td>
  </tr>
</template>
<script setup>
  const props = defineProps({
    company: Object,
  });
  const search = async function (EIK) {
    const res = await $fetch(`api/search/${EIK}`);
    console.log(res);
  };

  const deleteRow = async function (EIK) {
    await $fetch(`api/companies/delete/${EIK}`, {
      method: "DELETE",
    });
  };
</script>
<style></style>
