<template>
  <div class="flex w-full h-full items-center justify-center">
    <CardComponent title="Create Event">
      <form id="eventForm" class="w-full" @submit.prevent="createEvent">
        <section class="form-section">
          <label for="sportSelect" class="create-sport-label">Sport:</label>
          <div class="relative inline-block">
            <select
              id="sportSelect"
              v-model.number="selectedOptions.sport_id"
              name="sportSelect"
              class="focus: outline-none"
              required
              @change="fetchMatches"
            >
              <option :value="null">Please select sport</option>
              <option
                v-for="(sport, index) in sportList"
                :key="index"
                :value="sport.id"
              >
                {{ sport.name }}
              </option>
            </select>
          </div>
        </section>

        <section class="form-section">
          <label for="matchSelect" class="create-sport-label">Match:</label>
          <div class="relative inline-block">
            <select
              id="matchSelect"
              v-model.number="selectedOptions.match_id"
              name="matchSelect"
              class="focus: outline-none"
              required
              @change="setTeams()"
            >
              <option :value="null">Please select match</option>
              <option
                v-for="(match, index) in matchList"
                :key="index"
                :value="match.id"
              >
                {{
                  match.teamOne.name +
                  ' : ' +
                  match.teamTwo.name +
                  ' -> ' +
                  match.created_at
                }}
              </option>
            </select>
          </div>
        </section>

        <section class="form-section">
          <label for="teamSelect" class="create-sport-label">Team:</label>
          <div class="relative inline-block">
            <select
              id="teamSelect"
              v-model.number="selectedOptions.team_id"
              name="teamSelect"
              class="focus: outline-none"
              required
              @change="setPlayers"
            >
              <option :value="null">Please select team</option>
              <option
                v-for="(team, index) in teamList"
                :key="index"
                :value="team.id"
              >
                {{ team.name }}
              </option>
            </select>
          </div>
        </section>

        <section class="form-section">
          <label for="teamSelect" class="create-sport-label">Player:</label>
          <div class="relative inline-block">
            <select
              id="playerSelect"
              v-model.number="selectedOptions.player_id"
              name="playerSelect"
              class="focus: outline-none"
              required
            >
              <option :value="null">Please select player</option>
              <option
                v-for="(player, index) in playerOptions"
                :key="index"
                :value="player.id"
              >
                {{ player.name }}
              </option>
            </select>
          </div>
        </section>

        <section class="form-section">
          <label for="eventType" class="create-sport-label">Event type:</label>
          <div class="relative inline-block">
            <select
              id="eventType"
              v-model.number="selectedOptions.type"
              name="eventType"
              class="focus: outline-none"
              required
            >
              <option :value="null">Please select event type</option>
              <option
                v-for="(eventType, index) in eventTypeOptions"
                :key="index"
              >
                {{ eventType }}
              </option>
            </select>
          </div>
        </section>

        <section class="form-section">
          <label for="eventTime" class="create-sport-label"
            >Event time(min):</label
          >
          <input
            id="eventTime"
            v-model.number="selectedOptions.time"
            type="number"
            name="eventTime"
            min="1"
            placeholder="Enter sport name"
            class="create-sport-input placeholder-glitter focus:placeholder-pureBlueLight"
            required
          />
        </section>

        <section class="flex justify-around items-center w-full">
          <button
            type="submit"
            class="w-32 py-2 px-4 rounded-lg text-xl font-semibold bg-white border border-softRed text-softRed transitioned-coloring focus:outline-none hover:bg-softRed hover:text-white"
          >
            <span>Create</span>
          </button>
        </section>
      </form>
    </CardComponent>
  </div>
</template>
<script>
import CardComponent from '~/components/CardComponent'
export default {
  components: {
    CardComponent,
  },
  async asyncData({ $axios, redirect }) {
    try {
      const responseSports = await $axios.get('sports/filter')
      const responsePlayers = await $axios.get('players/filter')
      console.log(responseSports)
      console.log(responsePlayers)
      const sportList = responseSports.data.data
      const playerList = responsePlayers.data.data

      return {
        sportList,
        playerList,
      }
    } catch (error) {
      console.log(error)
      redirect('/dashboard')
    }
  },
  data() {
    return {
      matchList: [],
      teamList: [],
      playerOptions: [],

      selectedOptions: {
        sport_id: null,
        match_id: null,
        team_id: null,
        player_id: null,
        type: null,
        time: 1,
      },

      eventTypeOptions: [
        'goal',
        'field_goal',
        'three_point_field_goal',
        'yellow_card',
        'red_card',
        'penalty_kick',
        'game_end',
      ],
    }
  },
  methods: {
    async fetchMatches() {
      if (this.selectedOptions.sport_id) {
        try {
          const response = await this.$axios.$get(
            `matches/filter/${this.selectedOptions.sport_id}`
          )

          console.log(response)
          this.matchList = response.data
        } catch (error) {
          alert(error)
          this.$router.push('/dashboard')
        }
      } else {
        this.resetMatchOptions()
        this.resetTeamOptions()
        this.resetPlayerOptions()
      }
    },
    setTeams() {
      if (this.selectedOptions.match_id) {
        this.resetTeamOptions()
        const selectedMatch = this.matchList.find(
          (match) => match.id === this.selectedOptions.match_id
        )
        console.log(selectedMatch)
        this.teamList.push(selectedMatch.teamOne)
        this.teamList.push(selectedMatch.teamTwo)
      } else {
        this.resetTeamOptions()
        this.resetPlayerOptions()
      }
    },

    setPlayers() {
      if (this.selectedOptions.team_id) {
        this.resetPlayerOptions()
        this.playerList.forEach((player) => {
          if (player.team_id === this.selectedOptions.team_id) {
            this.playerOptions.push(player)
          }
        })
        console.log(`team id: ${this.selectedOptions.team_id}`)
      } else {
        this.resetPlayerOptions()
      }
    },

    resetMatchOptions() {
      this.selectedOptions.match_id = null
      this.matchList = []
    },

    resetTeamOptions() {
      this.selectedOptions.team_id = null
      this.teamList = []
    },
    resetPlayerOptions() {
      this.selectedOptions.player_id = null
      this.playerOptions = []
    },

    async createEvent() {
      try {
        await this.$axios.$post('events/create', {
          match_id: this.selectedOptions.match_id,
          team_id: this.selectedOptions.team_id,
          player_id: this.selectedOptions.player_id,
          type: this.selectedOptions.type,
          time: this.selectedOptions.time * 60000,
          interval: 1,
        })
        alert(`Event successfully created!`)
        document.getElementById('eventForm').reset()
      } catch (error) {
        alert(`Error! Please try again.`)
      }
    },
  },
}
</script>
<style scoped>
.form-section {
  @apply mb-8 p-4 w-full;
}

.create-sport-label {
  @apply inline-block cursor-pointer font-semibold text-lg mr-12;
}
.create-sport-input {
  @apply w-48 rounded-lg py-3 px-6 border border-glitter bg-white text-xl tracking-wider text-gray-500;
}

.create-sport-input:focus {
  @apply border-pureBlueLight outline-none text-pureBlueLight;
}

.icon-clear {
  @apply absolute top-50% right-3% font-semibold text-3xl text-gray-500 cursor-pointer;
}

.icon-clear:hover {
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
