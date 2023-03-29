<template>
  <tr
    class="bg-white border-b border-primery-color"
    :class="`row-${company.EIK}`">
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
    <td class="p-2 border-x border-primery-color">
      <ClientOnly
        ><font-awesome-icon
          class="w-8 h-8"
          :class="
            displaySymbol(9) === symbols.check
              ? 'text-green-500'
              : 'text-red-500'
          "
          :icon="displaySymbol(9)"
      /></ClientOnly>
    </td>

    <td
      class="px-6 py-2 font-medium text-lg text-gray-900 border-x border-primery-color">
      {{ new Date(company.last_checked).toLocaleString() }}
    </td>
    <td class="px-2 py-4 border-x border-primery-color text-center">
      <button
        @click="check(company.EIK)"
        class="bg-primery-color rounded-2xl font-semibold text-2xl text-white py-0.5 px-8 transition-all ease-in-out duration-500 hover:translate-x-2 hover:-translate-y-1 hover:shadow-[-6px_8px_8px_0px] hover:shadow-gray-dark">
        Check
      </button>
    </td>
    <td class="px-2 py-4 border-x border-primery-color text-center">
      <button @click="deleteRow(company.EIK)" class="py-0.5">
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
  import html2canvas from "html2canvas";
  import { saveAs } from "file-saver";
  const props = defineProps({
    company: Object,
  });
  const check = async function (EIK) {
    await $fetch(`api/companies/check/${EIK}`, {
      method: "POST",
      headers: {
        Authorization: useRuntimeConfig().public.token,
      },
      body: props.company.company_name,
    });
    setTimeout(async () => {
      const canvas1 = await html2canvas(document.querySelector(".head"));
      const canvas2 = await html2canvas(document.querySelector(`.row-${EIK}`));
      const canvas = document.createElement("canvas");
      canvas.width = canvas1.width;
      canvas.height = canvas1.height + canvas2.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(canvas1, 0, 0);
      ctx.drawImage(canvas2, 0, canvas1.height);

      canvas.toBlob(function (blob) {
        saveAs(
          blob,
          `${props.company.EIK}_${props.company.company_name}_${new Date()
            .toLocaleTimeString(new Date())
            .substring(0, 5)}_${new Date().toLocaleDateString(new Date())}.png`
        );
      });
    }, 1000);
  };
  const symbols = reactive({
    check: "fa-solid fa-check",
    xmark: "fa-solid fa-xmark",
  });

  const deleteRow = async function (EIK) {
    await $fetch(`api/companies/delete/${EIK}`, {
      method: "DELETE",
      headers: {
        Authorization: useRuntimeConfig().public.token,
      },
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
