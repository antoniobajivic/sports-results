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
            <th class="text-left p-3 px-5">Team ID</th>
            <th class="text-left p-3 px-5">Player ID</th>
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
              <span class="bg-transparent">{{ event.team_id }}</span>
            </td>
            <td class="p-3 px-5">
              <span class="bg-transparent">{{ event.player_id }}</span>
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
    // const responseFaculties = await app.$axios.$get('faculties/filter')
    this.eventsData = responseEvents.data.events

    // facultyList: responseFaculties.data,
  },
  data() {
    return {
      eventsData: [],
    }
  },
  methods: {
    // goToMatchInfo(index) {
    //   this.$store.commit('SET_MATCH', this.matchesData[index])
    //   this.$router.push(
    //     `/match/sport-matches/match/${this.matchesData[index].id}`
    //   )
    // },
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
