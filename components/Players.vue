<template>
  <div class="team_card">
    <h1>{{ teamName }}</h1>
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
