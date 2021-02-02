<template>
  <!-- component -->
  <div class="h-full text-gray-900 bg-gray-200">
    <div class="p-4 flex">
      <h1 class="text-3xl">Events for match: {{ $route.params.id }}</h1>
    </div>
    <div class="px-3 py-4 flex justify-center">
      <table class="w-full text-md bg-white shadow-md rounded mb-4">
        <tbody>
          <tr class="border-b">
            <th class="text-left p-3 px-5">Event ID</th>
            <th class="text-left p-3 px-5">Team</th>
            <th class="text-left p-3 px-5">Player</th>
            <th class="text-left p-3 px-5">Interval</th>
            <th class="text-left p-3 px-5">Time (min)</th>
            <!-- <th class="text-left p-3 px-5">Date</th> -->
            <th class="text-left p-3 px-5">Type</th>
            <th class="text-right p-3 px-5">Operations</th>
          </tr>
          <!-- "team_id": 5,
                "player_id": 11,
                "time": 2700000,
                "interval": 1,
                "id": 15,
                "created_at": "2021-01-31 23:28:39",
                "updated_at": "2021-01-31 23:28:39",
                "type": "three_point_field_goal" -->
          <tr
            v-for="(event, index) in eventsData"
            :key="index"
            class="border-b hover:bg-orange-100 bg-gray-100"
          >
            <td class="p-3 px-5">
              <span class="bg-transparent">{{ event.id }}</span>
            </td>
            <td class="p-3 px-5">
              <span class="bg-transparent">{{ event.teamInfo.name }}</span>
            </td>
            <td class="p-3 px-5">
              <span class="bg-transparent">{{ event.playerInfo.name }}</span>
            </td>
            <td class="p-3 px-5">
              <span class="bg-transparent">{{ event.interval }}</span>
            </td>
            <td class="p-3 px-5">
              <span class="bg-transparent">{{ event.time / 60000 }}</span>
            </td>
            <td class="p-3 px-5">
              <span class="bg-transparent">{{ event.type }}</span>
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
                @click="deleteEvent(index)"
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
  async fetch() {
    const matchID = this.$route.params.id
    const responseEvents = await this.$axios.$get(`matches/get/${matchID}`)
    const responsePlayers = await this.$axios.$get('players/filter')
    const responseTeams = await this.$axios.$get('teams/filter')
    this.eventsData = responseEvents.data.events
    this.eventsData = this.eventsData.sort((a, b) =>
      a.time > b.time ? 1 : b.time > a.time ? -1 : 0
    )
    for (let i = 0; i < this.eventsData.length; i++) {
      this.eventsData[i].playerInfo = responsePlayers.data.find((player) => {
        return player.id === this.eventsData[i].player_id
      })
      this.eventsData[i].teamInfo = responseTeams.data.find((team) => {
        return team.id === this.eventsData[i].team_id
      })
    }
  },
  data() {
    return {
      eventsData: [],
    }
  },
  methods: {
    async deleteEvent(index) {
      const eventID = this.eventsData[index].id
      const responseData = await this.$axios.$delete(`events/delete/${eventID}`)
      if (responseData.data) {
        alert('Successfully deleted event')
        this.eventsData.splice(index, 1)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
