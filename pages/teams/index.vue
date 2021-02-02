<template>
  <!-- component -->
  <div class="h-full text-gray-900 bg-gray-200">
    <div class="p-4 flex">
      <h1 class="text-3xl">Teams</h1>
    </div>
    <div class="px-3 py-4 flex justify-center">
      <table class="w-full text-md bg-white shadow-md rounded mb-4">
        <tbody>
          <tr class="border-b">
            <th class="text-left p-3 px-5">ID</th>
            <th class="text-left p-3 px-5">Name</th>
            <th class="text-right p-3 px-5">Operations</th>
          </tr>
          <tr
            v-for="(team, index) in teamData"
            :key="index"
            class="border-b hover:bg-orange-100 bg-gray-100"
          >
            <td class="p-3 px-5">
              <span class="bg-transparent">{{ team.id }}</span>
            </td>
            <td class="p-3 px-5">
              <span class="bg-transparent">{{ team.name }}</span>
            </td>
            <td class="p-3 px-5 flex justify-end">
              <button
                type="button"
                class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                @click="goToTeamInfo(index)"
              >
                Players</button
              ><button
                type="button"
                class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                @click="deleteTeam(index)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ app }) {
    const responseTeams = await app.$axios.$get('teams/filter')
    const responseFaculties = await app.$axios.$get('faculties/filter')
    return {
      teamData: responseTeams.data,
      facultyList: responseFaculties.data,
    }
  },
  data() {
    return {
      teamData: [],
      facultyList: [],
    }
  },
  methods: {
    goToTeamInfo(index) {
      this.$store.commit('SET_TEAM', this.teamData[index])
      this.$router.push(`/teams/info/${this.teamData[index].id}`)
    },
    async deleteTeam(index) {
      const teamID = this.teamData[index].id
      const responseData = await this.$axios.$delete(`teams/delete/${teamID}`)
      if (responseData.data) {
        this.teamData.splice(index, 1)
        alert('Successfully deleted team')
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
