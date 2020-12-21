<template>
  <div class="create-team w-full flex-grow flex justify-around items-center">
    <CardComponent title="Create team">
      <form :model="newTeam" class="w-full" @submit.prevent="createNewTeam">
        <section class="mb-8 w-full p-4">
          <label for="team-name" class="create-team-label">Team name:</label>
          <div class="relative w-full p-4 flex justify-start items-center">
            <input
              id="team-name"
              v-model="newTeam.nameTeam"
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
          <label for="input-faculty" class="create-team-label">Faculty:</label>
          <div class="relative w-full p-4 flex justify-start items-center">
            <input
              id="input-faculty"
              v-model="newTeam.faculty"
              type="text"
              name="input-faculty"
              placeholder="Enter your faculty"
              class="create-team-input placeholder-glitter focus:placeholder-pureBlueLight"
              required
            />
            <i
              class="mdi mdi-close create-team-icon-clear transitioned-coloring"
              style="transform: translate(0, -50%)"
              @click.stop="clearFaculty"
            ></i>
          </div>
        </section>
        <section
          class="mb-8 w-full p-4 flex flex-col justify-start items-start"
        >
          <label class="create-team-label px-2">Select players:</label>
          <div class="w-full p-4 flex justify-between items-start">
            <div class="w-2/5">
              <select
                v-model="selectedPlayerId"
                placeholder="Players"
                class="select-players create-team-select relative"
                required
                @change="onChange()"
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
  data() {
    return {
      // Professional (zovite me: 'Top Eleven Manager')
      playerList: [
        {
          id: 1,
          name: 'Igor',
        },
        {
          id: 2,
          name: 'Zoki',
        },
        {
          id: 3,
          name: 'Draško',
        },
        {
          id: 4,
          name: 'Johnny',
        },
        {
          id: 5,
          name: 'Milenko',
        },
        {
          id: 6,
          name: 'Šemso',
        },
      ],
      newTeam: {
        nameTeam: '',
        faculty: '',
        selectedPlayers: [],
      },
      selectedPlayerId: null,
      currentPlayerId: null,
      maxPlayersCounter: 5,
      currentPlayersCounter: 0,
    }
  },
  methods: {
    getPlayerList() {
      // Here we will get possible player depending on which faculty they are attending
    },
    // Sending object newTeam to API
    createNewTeam() {
      //   console.log(this.newTeam.selectedPlayers)
      //   this.$store.dispatch
      //     .commit('createTeam', this.newTeam)
      //     .then((res) => {
      //       alert(res)
      //     })
      //     .catch((err) => {
      //       throw new Error(err)
      //     })
      // Clears input
    },
    clearName() {
      console.log(this.$route.name)
      if (this.newTeam.nameTeam) {
        this.newTeam.nameTeam = ''
      }
    },
    // Clears input
    clearFaculty() {
      if (this.newTeam.faculty) {
        this.newTeam.faculty = ''
      }
    },
    // Back-end needs to create sport object which will have maximumPlayerCounter, depending on sport and route to that object
    // Player here is added on team
    addPlayerToTeam(selectedId) {
      const currentID = selectedId
      this.selectedPlayerId = ''
      if (currentID) {
        if (this.currentPlayersCounter < this.maxPlayersCounter) {
          this.newTeam.selectedPlayers = this.newTeam.selectedPlayers.concat(
            currentID
          )
          this.currentPlayersCounter++
        } else {
          this.currentPlayersCounter = 0
        }
      } else {
        console.log('Select player')
      }
    },
    // Follows the change of selected value, if you need to use temporary ID
    onChange() {
      console.log(this.selectedPlayerId)
      if (this.selectedPlayerId) {
        this.currentPlayerId = this.selectedPlayerId
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
