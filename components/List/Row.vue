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
          class="w-8 h-8"
          :class="
            displaySymbol(1) === symbols.check
              ? 'text-green-500'
              : 'text-red-500'
          "
          :icon="displaySymbol(1)"
      /></ClientOnly>
    </td>
    <td class="p-2 border-x border-primery-color">
      <ClientOnly
        ><font-awesome-icon
          class="w-8 h-8"
          :class="
            displaySymbol(2) === symbols.check
              ? 'text-green-500'
              : 'text-red-500'
          "
          :icon="displaySymbol(2)"
      /></ClientOnly>
    </td>
    <td class="p-2 border-x border-primery-color">
      <ClientOnly
        ><font-awesome-icon
          class="w-8 h-8"
          :class="
            displaySymbol(3) === symbols.check
              ? 'text-green-500'
              : 'text-red-500'
          "
          :icon="displaySymbol(3)"
      /></ClientOnly>
    </td>
    <td class="p-2 border-x border-primery-color">
      <ClientOnly
        ><font-awesome-icon
          class="w-8 h-8"
          :class="
            displaySymbol(4) === symbols.check
              ? 'text-green-500'
              : 'text-red-500'
          "
          :icon="displaySymbol(4)"
      /></ClientOnly>
    </td>
    <td class="p-2 border-x border-primery-color">
      <ClientOnly
        ><font-awesome-icon
          class="w-8 h-8"
          :class="
            displaySymbol(5) === symbols.check
              ? 'text-green-500'
              : 'text-red-500'
          "
          :icon="displaySymbol(5)"
      /></ClientOnly>
    </td>
    <td class="p-2 border-x border-primery-color">
      <ClientOnly
        ><font-awesome-icon
          class="w-8 h-8"
          :class="
            displaySymbol(6) === symbols.check
              ? 'text-green-500'
              : 'text-red-500'
          "
          :icon="displaySymbol(6)"
      /></ClientOnly>
    </td>
    <td class="p-2 border-x border-primery-color">
      <ClientOnly
        ><font-awesome-icon
          class="w-8 h-8"
          :class="
            displaySymbol(7) === symbols.check
              ? 'text-green-500'
              : 'text-red-500'
          "
          :icon="displaySymbol(7)"
      /></ClientOnly>
    </td>
    <td class="p-2 border-x border-primery-color">
      <ClientOnly
        ><font-awesome-icon
          class="w-8 h-8"
          :class="
            displaySymbol(8) === symbols.check
              ? 'text-green-500'
              : 'text-red-500'
          "
          :icon="displaySymbol(8)"
      /></ClientOnly>
    </td>
    <td
      class="px-6 py-2 font-medium text-lg text-gray-900 border-x border-primery-color">
      {{ new Date(company.last_checked).toLocaleString() }}
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
    await $fetch(`api/companies/check/${EIK}`);
  };
  const symbols = reactive({
    check: "fa-solid fa-check",
    xmark: "fa-solid fa-xmark",
  });

  const deleteRow = async function (EIK) {
    await $fetch(`api/companies/delete/${EIK}`, {
      method: "DELETE",
    });
  };

  const displaySymbol = function (id) {
    if (props.company.sanction_lists) {
      for (let i = 0; i < props.company.sanction_lists.length; i++) {
        if (props.company.sanction_lists[i].id === id) {
          return symbols.check;
        }
      }
      return symbols.xmark;
    }
  };
</script>
<style></style>
