<template>
  <div class="create-team w-full flex-grow flex justify-around items-center">
    <CardComponent title="Create team">
      <form :model="newTeam" class="w-full" @submit.prevent="createNewTeam">
        <section class="mb-8 w-full p-4">
          <label for="team-name" class="create-team-label">Team name:</label>
          <div class="relative w-full p-4 flex justify-start items-center">
            <input
              id="team-name"
              v-model="newTeam.name"
              type="text"
              name="team-name"
              placeholder="Enter your team's name"
              class="create-team-input placeholder-glitter focus:placeholder-pureBlueLight"
              required
            />
            <i
              class="mdi mdi-close create-team-icon-clear transitioned-coloring"
              style="transform: translate(0, -50%)"
              @click.stop="clearName"
            ></i>
          </div>
        </section>
        <section class="mb-8 w-full p-4">
          <label for="select-faculty" class="create-team-label">Faculty:</label>
          <div class="relative w-full p-4 flex justify-start items-center">
            <select
              id="select-faculty"
              v-model="newTeam.faculty_id"
              name="select-faculty"
              placeholder="Select team's faculty"
              class="create-team-select placeholder-glitter focus:placeholder-pureBlueLight"
              required
              @change="onFacultytChange"
            >
              <option
                v-for="(faculty, index) in facultyList"
                :key="index"
                :value="faculty.id"
              >
                {{ faculty.name }}, {{ faculty.city }}
              </option>
            </select>
          </div>
        </section>
        <section class="mb-8 w-full p-4">
          <label for="select-sport" class="create-team-label">Sport:</label>
          <div class="relative w-full p-4 flex justify-start items-center">
            <select
              id="select-sport"
              v-model="newTeam.sport_id"
              name="select-sport"
              placeholder="Select sport"
              class="create-team-select text-black placeholder-glitter focus:placeholder-pureBlueLight"
              required
              @change="onSportChange"
            >
              <option
                v-for="(sport, index) in sportList"
                :key="index"
                :value="sport.id"
              >
                {{ sport.id }}. {{ sport.name }} - Min. players:
                {{ sport.minPlayers }}
              </option>
            </select>
          </div>
        </section>
        <section
          class="mb-8 w-full p-4 flex flex-col justify-start items-start"
        >
          <label class="create-team-label px-4">Select players:</label>
          <div class="w-full p-4 flex justify-between items-start">
            <div class="w-2/5">
              <select
                v-model="selectedPlayerId"
                placeholder="Players"
                class="select-players create-team-select relative"
                multiple
                required
                @change="onPlayerChange()"
              >
                <option
                  v-for="(playerId, index) in playerList"
                  :key="index"
                  :value="playerId.id"
                >
                  {{ playerId.name }}
                </option>
              </select>
            </div>
            <span
              class="w-2/5 text-center py-2 px-4 rounded-lg text-xl font-semibold bg-white border border-pureBlue text-pureBlue transitioned-coloring hover:bg-pureBlue hover:text-white focus:outline-none"
              @click="addPlayerToTeam(selectedPlayerId)"
            >
              <!-- <span>Add to team</span> -->
              Add to team
            </span>
          </div>
        </section>
        <hr />
        <section class="w-full p-8 flex justify-start items-center">
          <button
            type="submit"
            class="w-56 py-5 px-4 rounded-lg text-xl font-semibold bg-white border border-softRed text-softRed transitioned-coloring hover:bg-softRed hover:text-white focus:outline-none"
          >
            <span>Create</span>
          </button>
        </section>
      </form>
    </CardComponent>
  </div>
</template>

<script>
import CardComponent from '@/components/CardComponent'
export default {
  name: 'CreateTeam',
  components: {
    CardComponent,
  },
  async asyncData({ app }) {
    const players = await app.$axios.$get('players/filter')
    const faculties = await app.$axios.$get('faculties/filter')
    const sports = await app.$axios.$get('sports/filter')
    const currentPlayerList = players.data
    const currentFacultiesList = faculties.data
    const currentSportList = sports.data
    return {
      playerList: currentPlayerList,
      facultyList: currentFacultiesList,
      sportList: currentSportList,
    }
  },
  data() {
    return {
      newTeam: {
        name: '',
        faculty_id: '',
        sport_id: '',
        players: [],
      },
      selectedPlayerId: null,
      currentPlayerId: null,
      minPlayersCounter: '',
      currentPlayersCounter: 0,
    }
  },
  methods: {
    getPlayerList() {
      // Here we will get possible player depending on which faculty they are attending
    },
    // Sending object newTeam to API
    createNewTeam() {
      console.log(this.newTeam.players)
      this.$store
        .dispatch('createTeam', this.newTeam)
        .then((res) => {
          this.$store.commit('SET_TEAM', res.data)
          this.$router.push(`/teams/info/${res.data.id}`)
        })
        .catch((err) => {
          throw new Error(err)
        })
    },
    // Clears input
    clearName() {
      if (this.newTeam.name) {
        this.newTeam.name = ''
      }
    },
    // Clears input
    clearFaculty() {
      if (this.newTeam.faculty) {
        this.newTeam.faculty = ''
      }
    },
    // Back-end needs to create sport object which will have maximumPlayerCounter, depending on sport and route to that object
    // Adding player on team
    addPlayerToTeam() {
      if (this.selectedPlayerId) {
        if (this.currentPlayersCounter < this.minPlayersCounter) {
          this.newTeam.players = this.newTeam.players.concat(
            this.selectedPlayerId
          )
          this.currentPlayersCounter++
          this.selectedPlayerId = ''
        } else {
          const differenceToAdd =
            this.minPlayersCounter - this.currentPlayersCounter
          alert(`You need to add ${differenceToAdd} more players.`)
        }
      } else {
        alert('Select player')
      }
    },
    // Follows the change of selected value, if you need to use temporary ID
    onPlayerChange() {
      console.log(this.selectedPlayerId)
      if (this.selectedPlayerId) {
        this.currentPlayerId = this.selectedPlayerId
      }
    },
    onFacultytChange() {
      console.log(`Faculty ID: ${this.newTeam.faculty_id}`)
    },
    onSportChange() {
      if (this.newTeam.sport_id) {
        const currentSportId = this.newTeam.sport_id
        const foundSport = this.sportList.find((sport) => {
          return sport.id === currentSportId
        })
        this.minPlayersCounter = foundSport.minPlayers
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.create-team-label {
  @apply block px-4 cursor-pointer font-semibold text-lg;
}

.create-team-select {
  @apply w-full p-2 border-2 rounded-lg text-xl text-black text-center;
  &:focus {
    outline: none;
  }
}

.create-team-input {
  @apply w-full rounded-lg py-3 px-6 border border-glitter bg-white text-xl tracking-wider text-gray-500;
}

.create-team-input:focus {
  @apply border-pureBlueLight outline-none text-pureBlueLight;
}

.create-team-icon-clear {
  @apply absolute top-50% right-3% font-semibold text-3xl text-gray-500 cursor-pointer;
}

.create-team-icon-clear:hover {
  @apply text-red-500;
}

.transitioned-coloring {
  @apply transition-colors duration-200 ease-in-out;
}

/* Change the white to any color ;) */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px white inset !important;
}
</style>
