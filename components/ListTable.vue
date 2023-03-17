<template>
  <div class="relative overflow-x-auto">
    <table
      class="w-full text-sm text-left text-gray-500 border border-primery-color">
      <thead
        class="text-md font-semibold text-white uppercase bg-primery-color border border-primery-color">
        <tr>
          <th scope="col" class="px-6 py-3 border-x border-white">EIK</th>
          <th scope="col" class="px-6 py-3 border-x border-white">List1</th>
          <th scope="col" class="px-6 py-3 border-x border-white">List2</th>
          <th scope="col" class="px-6 py-3 border-x border-white">List3</th>
          <th scope="col" class="px-6 py-3 border-x border-white">List4</th>
          <th scope="col" class="px-6 py-3 border-x border-white">List5</th>
          <th scope="col" class="px-6 py-3 border-x border-white">List6</th>
          <th scope="col" class="px-6 py-3 border-x border-white">List7</th>
          <th scope="col" class="px-6 py-3 border-x border-white">List8</th>
          <th scope="col" class="px-6 py-3 border-x border-white"></th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white border-b border-primery-color">
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {{ EIK }}
          </th>
          <td class="px-6 py-4 border-x border-primery-color">Silver</td>
          <td class="px-6 py-4 border-x border-primery-color">Laptop</td>
          <td class="px-6 py-4 border-x border-primery-color">$2999</td>
          <td class="px-6 py-4 border-x border-primery-color">Silver</td>
          <td class="px-6 py-4 border-x border-primery-color">Laptop</td>
          <td class="px-6 py-4 border-x border-primery-color">$2999</td>
          <td class="px-6 py-4 border-x border-primery-color">$2999</td>
          <td class="px-6 py-4 border-x border-primery-color">$2999</td>
          <td class="px-2 py-4 border-x border-primery-color text-center">
            <button
              @click="search(EIK)"
              class="bg-primery-color rounded-2xl font-semibold text-2xl text-white py-0.5 px-8">
              Check
            </button>
          </td>
        </tr>
        <tr class="bg-white border-b border-primery-color">
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            Microsoft Surface Pro
          </th>
          <td class="px-6 py-4 border-x border-primery-color">White</td>
          <td class="px-6 py-4 border-x border-primery-color">Laptop PC</td>
          <td class="px-6 py-4 border-x border-primery-color">$1999</td>
          <td class="px-6 py-4 border-x border-primery-color">White</td>
          <td class="px-6 py-4 border-x border-primery-color">Laptop PC</td>
          <td class="px-6 py-4 border-x border-primery-color">$1999</td>
          <td class="px-6 py-4 border-x border-primery-color">$1999</td>
          <td class="px-6 py-4 border-x border-primery-color">$1999</td>
          <td class="px-2 py-4 border-x border-primery-color text-center">
            <button
              class="bg-primery-color rounded-2xl font-semibold text-2xl text-white py-0.5 px-8">
              Check
            </button>
          </td>
        </tr>
        <tr class="bg-white">
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            Magic Mouse 2
          </th>
          <td class="px-6 py-4 border-x border-primery-color">Black</td>
          <td class="px-6 py-4 border-x border-primery-color">Accessories</td>
          <td class="px-6 py-4 border-x border-primery-color">$99</td>
          <td class="px-6 py-4 border-x border-primery-color">Black</td>
          <td class="px-6 py-4 border-x border-primery-color">Accessories</td>
          <td class="px-6 py-4 border-x border-primery-color">$99</td>
          <td class="px-6 py-4 border-x border-primery-color">$99</td>
          <td class="px-6 py-4 border-x border-primery-color">$99</td>
          <td class="px-2 py-4 border-x border-primery-color text-center">
            <button
              class="bg-primery-color rounded-2xl font-semibold text-2xl text-white py-0.5 px-8">
              Check
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
  const props = defineProps({
    EIK: String,
  });
  const search = async function (EIK) {
    const res = await $fetch(`api/search/${EIK}`);
    console.log(res);
  };
</script>
<style></style>
