<template>
  <div></div>
</template>

<script>
export default {
  async asyncData({ app }) {
    const responseTeams = await app.$axios.$get('teams/filter')
    return {
      teamData: responseTeams.data.data,
    }
  },
  data() {
    return {
      teamsData: [],
    }
  },
}
</script>

<style lang="scss" scoped></style>
