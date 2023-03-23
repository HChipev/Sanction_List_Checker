<template>
  <tr class="bg-white border-b border-primery-color">
    <th
      scope="row"
      class="px-6 py-2 font-medium text-lg text-gray-900 whitespace-nowrap">
      {{ email.email }}
    </th>
    <td class="px-2 py-4 border-x border-primery-color text-center">
      <button @click="deleteRow(email.email)" class="py-0.5">
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
    email: Object,
  });

  const deleteRow = async function (email) {
    await $fetch(`api/emails/delete/${email}`, {
      method: "DELETE",
      headers: {
        Authorization: useRuntimeConfig().public.token,
      },
    });
  };
</script>
<style></style>
