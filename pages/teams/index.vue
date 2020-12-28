<template>
  <div>
    {{ teamData }}
  </div>
</template>

<script>
export default {
  async asyncData({ app }) {
    const responseTeams = await app.$axios.$get('teams/filter')
    return {
      teamData: responseTeams.data,
    }
  },
  data() {
    return {
      teamData: [],
    }
  },
}
</script>

<style lang="scss" scoped></style>
