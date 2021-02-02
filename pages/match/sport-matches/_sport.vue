<template>
  <!-- component -->
  <div class="h-full text-gray-900 bg-gray-200">
    <div class="p-4 flex">
      <h1 class="text-3xl">Matches</h1>
    </div>
    <div class="px-3 py-4 flex justify-center">
      <table class="w-full text-md bg-white shadow-md rounded mb-4">
        <tbody>
          <tr class="border-b">
            <th class="text-left p-3 px-5">Match ID</th>
            <th class="text-left p-3 px-5">Team 1</th>
            <th class="text-left p-3 px-5">Score</th>
            <th class="text-left p-3 px-5">Team 2</th>
            <th class="text-left p-3 px-5">Date</th>
            <th class="text-left p-3 px-5">Time</th>
            <th class="text-right p-3 px-5">Operations</th>
          </tr>
          <tr
            v-for="(match, index) in matchesData"
            :key="index"
            class="border-b hover:bg-orange-100 bg-gray-100"
          >
            <td class="p-3 px-5">
              <span class="bg-transparent">{{ match.id }}</span>
            </td>
            <td class="p-3 px-5">
              <span class="bg-transparent">{{ match.teamOne.name }}</span>
            </td>
            <td class="p-3 px-5">
              <span class="bg-transparent">{{ match.score }}</span>
            </td>
            <td class="p-3 px-5">
              <span class="bg-transparent">{{ match.teamTwo.name }}</span>
            </td>
            <td class="p-3 px-5">
              <span class="bg-transparent">{{ match.date.split('T')[0] }}</span>
            </td>
            <td class="p-3 px-5">
              <span class="bg-transparent">{{
                match.date.split('T')[1].split('.000Z')[0]
              }}</span>
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
                class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                @click="goToMatchInfo(index)"
              >
                View match events</button
              ><button
                type="button"
                class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                @click="deleteMatch(index)"
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
    const sportID = this.$route.params.sport
    const responseMatches = await this.$axios.$get(`matches/filter/${sportID}`)
    // const responseFaculties = await app.$axios.$get('faculties/filter')

    this.matchesData = responseMatches.data

    // facultyList: responseFaculties.data,
  },
  data() {
    return {
      matchesData: [],
      facultyList: [],
    }
  },
  computed: {
    // filterFaculties() {
    //   let foundFaculty = ''
    //   // const newVariable = ''
    //   this.teamData.forEach((team) => {
    //     foundFaculty = this.facultyList.filter((faculty) => {
    //       return faculty.id === team.faculty_id
    //     })
    //     const currentIndex = this.teamData.indexOf(team)
    //     this.teamData[currentIndex].faculty_name = foundFaculty[0].name
    //   })
    //   return this.teamData
    // },
  },
  methods: {
    goToMatchInfo(index) {
      this.$store.commit('SET_MATCH', this.matchesData[index])
      this.$router.push(
        `/match/sport-matches/match/${this.matchesData[index].id}`
      )
    },
    async deleteMatch(index) {
      const matchID = this.matchesData[index].id
      const responseData = await this.$axios.$delete(
        `matches/delete/${matchID}`
      )
      if (responseData.data) {
        alert('Successfully deleted match')
        this.matchesData.splice(index, 1)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
