<template>
  <!-- component -->
  <div class="h-full text-gray-900 bg-gray-200">
    <div class="p-4 flex">
      <h1 class="text-3xl">All players</h1>
    </div>
    <div class="px-3 py-4 flex justify-center">
      <table class="w-full text-md bg-white shadow-md rounded mb-4">
        <tbody>
          <tr class="border-b">
            <th class="text-left p-3 px-5">ID</th>
            <th class="text-left p-3 px-5">Name</th>
            <th class="text-left p-3 px-5">Team</th>
            <th class="text-right p-3 px-5">Operations</th>
          </tr>
          <tr
            v-for="(player, index) in playerList"
            :key="index"
            class="border-b hover:bg-orange-100 bg-gray-100"
          >
            <td class="p-3 px-5">
              <span class="bg-transparent">{{ player.id }}</span>
            </td>
            <td class="p-3 px-5">
              <span class="bg-transparent">{{ player.name }}</span>
            </td>
            <td class="p-3 px-5">
              <span class="bg-transparent">{{
                player.teamName || 'Without team'
              }}</span>
            </td>
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
export default {
  async asyncData({ app }) {
    const playersRequest = await app.$axios.$get('players/filter')
    const teamsRequest = await app.$axios.$get('teams/filter')
    let playersResponse = playersRequest.data
    const teamsResponse = teamsRequest.data
    // const finalPlayerList = []
    for (let i = 0; i < playersResponse.length; i++) {
      for (let j = 0; j < teamsResponse.length; j++) {
        if (playersResponse[i].team_id === teamsResponse[j].id) {
          playersResponse[i].teamName = teamsResponse[j].name
          // finalPlayerList.push(playersResponse[i])
        }
      }
    }
    playersResponse = playersResponse.sort((a, b) =>
      a.id > b.id ? 1 : b.id > a.id ? -1 : 0
    )
    // playersResponse.forEach((player) => {
    //   console.log(player.team)
    // })
    // const playerList = playersResponse
    return {
      playerList: playersResponse,
    }
  },
  data() {
    return {
      playerList: [],
    }
  },
  methods: {
    async deletePlayer(index) {
      const playerID = this.playerList[index].id
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
