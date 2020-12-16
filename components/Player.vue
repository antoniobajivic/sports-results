<template>
  <li>
    <span>Name: {{ playerName }}</span>
    <span>Team: {{ teamName }} from {{ teamCity }}</span>
  </li>
</template>

<script>
export default {
  name: 'Player',
  props: ['playerName', 'teamName', 'teamCity'],
}
</script>

<style lang="scss" scoped></style>
