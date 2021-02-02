<template>
  <!-- component -->
  <div class="h-full text-gray-900 bg-gray-200">
    <div class="p-4 flex flex-col">
      <h1 class="text-3xl">Team: {{ teamInfo.name }}</h1>
      <h1 class="text-3xl">
        Faculty: {{ facultyInfo.name }}, {{ facultyInfo.city }}
      </h1>
      <h1 class="text-3xl">Players</h1>
    </div>
    <div class="px-3 py-4 flex justify-center">
      <table class="w-full text-md bg-white shadow-md rounded mb-4">
        <tbody>
          <tr class="border-b">
            <th class="text-left p-3 px-5">ID</th>
            <th class="text-left p-3 px-5">Name</th>
            <!-- <th class="text-left p-3 px-5">Faculty</th> -->

            <th class="text-right p-3 px-5">Operations</th>
          </tr>
          <tr
            v-for="(player, index) in playersData"
            :key="index"
            class="border-b hover:bg-orange-100 bg-gray-100"
          >
            <td class="p-3 px-5">
              <span class="bg-transparent">{{ player.id }}</span>
            </td>
            <td class="p-3 px-5">
              <span class="bg-transparent">{{ player.name }}</span>
            </td>
            <!-- <td class="p-3 px-5">
              <span class="bg-transparent">{{
                filterFaculties[index].faculty_name
              }}</span>
            </td> -->

            <!-- <td class="p-3 px-5">
                        <select value="user.role" class="bg-transparent">
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                        </select>
                    </td> -->
            <td class="p-3 px-5 flex justify-end">
              <button
                type="button"
                class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                @click="deletePlayer(index)"
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
// import CardComponent from '@/components/CardComponent'
export default {
  // components: {
  //   CardComponent,
  // },
  async fetch() {
    const facultyRequest = await this.$axios.$get('faculties/filter')
    const playersRequest = await this.$axios.$get('players/filter')
    const teamsRequest = await this.$axios.$get('teams/filter')
    const teamsResponse = teamsRequest.data
    const playersResponse = playersRequest.data
    const facultyResponse = facultyRequest.data
    const teamID = Number(this.$route.params.id)
    const foundTeam = teamsResponse.find((team) => {
      return team.id === teamID
    })
    const foundFaculty = facultyResponse.find((faculty) => {
      return faculty.id === foundTeam.faculty_id
    })
    const foundPlayers = playersResponse.filter((player) => {
      if (player.team_id) {
        return player.team_id === teamID
      }
    })
    this.teamInfo = foundTeam
    this.facultyInfo = foundFaculty
    this.playersData = foundPlayers
  },
  data() {
    return {
      facultyInfo: {},
      playersData: [],
      teamInfo: {},
    }
  },
  methods: {
    async deletePlayer(index) {
      const playerID = this.playersData[index].id
      const responseData = await this.$axios.$delete(
        `players/delete/${playerID}`
      )
      if (responseData.data) {
        this.playersData.splice(index, 1)
        alert('Successfully deleted player')
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
