<template>
  <tr class="bg-white border-b border-primery-color">
    <th
      scope="row"
      class="px-6 py-2 font-medium text-lg text-gray-900 whitespace-nowrap">
      {{ user.email }}
    </th>
    <th
      scope="row"
      class="px-6 py-2 font-medium text-lg text-gray-900 border-x border-primery-color whitespace-nowrap">
      {{ user.user_metadata?.name || "No name" }}
    </th>
    <td class="px-2 py-4 border-x border-primery-color text-center">
      <button @click="deleteRow(user.id)" class="py-0.5">
        <ClientOnly
          ><font-awesome-icon
            class="text-red-700 w-7 h-7 transition-all duration-500 ease-in-out opacity-60 hover:opacity-100"
            icon="fa-solid fa-trash"
        /></ClientOnly>
      </button>
    </td>
  </tr>
</template>
<script setup>
  const props = defineProps({
    user: Object,
  });
  const emits = defineEmits(["delete"]);
  const deleteRow = async function (id) {
    const { error } = await $fetch(`api/admin/users/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: useRuntimeConfig().public.token,
      },
    });
    if (!error) {
      emits("delete");
    }
  };
</script>
<style></style>
