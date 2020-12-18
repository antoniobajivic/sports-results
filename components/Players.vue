<template>
  <div class="w-full mb-4 rounded-3xl border">
    <h1 class="text-3xl text-black font-semibold tracking-wider uppercase py-2 px-4">{{ teamName }}</h1>
    <ul ref="Player">
      <slot />
    </ul>
  </div>
</template>

<script>
// import Player from '@/components/Player'
export default {
  name: 'Players',
  // components: { Player },
  props: ['teamName'],
  // data() {
  //     return {
  //         key: value
  //     }
  // },
}
</script>

<style lang="scss" scoped></style>
