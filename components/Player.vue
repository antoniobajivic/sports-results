<template>
  <li class="text-2xl tracking-wider py-2 px-4 mt-2 rounded-xl flex justify-between items-center">
    <span>Name: {{ playerName }}</span>
    <div class="bg-white inline-block rounded-xl">
      <i class="mdi mdi-trash-can-outline text-3xl text-red-500 cursor-pointer hover:text-red-600"></i>
      <i class="mdi mdi-pencil text-3xl text-orange-400 cursor-pointer hover:text-orange-600"></i>
    </div>
  </li>
</template>

<script>
export default {
  name: 'Player',
  props: ['playerName', 'teamName'],
}
</script>

<style lang="scss" scoped></style>
