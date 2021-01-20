<template>
  <div class="create-match w-full flex-grow flex justify-around items-center">
    <CardComponent title="Add match">
      <form :model="newMatch" class="w-full" @submit.prevent="addnewMatch">
        <section class="w-full mb-8 p-4">
          <label for="select-sport" class="create-match-label">Sport:</label>
          <div class="relative w-full p-4 flex justify-start items-center">
            <select
              id="select-sport"
              v-model="newMatch.sport_id"
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
        <section class="w-full mb-8 p-4">
          <label for="select-team-one" class="create-match-label"
            >Team 1:</label
          >
          <div class="relative w-full p-4 flex justify-start items-center">
            <select
              id="select-team-one"
              v-model="newMatch.team_one"
              name="select-team-one"
              placeholder="Select team 1"
              class="create-match-select text-black placeholder-glitter focus:placeholder-pureBlueLight"
              required
              @change="onTeamOneChange"
            >
              <option
                v-for="(teamOne, index) in teamOneList"
                :key="index"
                :value="teamOne.id"
              >
                {{ teamOne.id }}. {{ teamOne.name }}
              </option>
            </select>
          </div>
        </section>
        <section class="w-full mb-8 p-4">
          <label for="select-team-two" class="create-match-label"
            >Team 2:</label
          >
          <div class="relative w-full p-4 flex justify-start items-center">
            <select
              id="select-team-two"
              v-model="newMatch.team_two"
              name="select-team-two"
              placeholder="Select team 2"
              class="create-match-select text-black placeholder-glitter focus:placeholder-pureBlueLight"
              required
              @change="onTeamTwoChange"
            >
              <option
                v-for="(teamTwo, index) in teamTwoList"
                :key="index"
                :value="teamTwo.id"
              >
                {{ teamTwo.id }}. {{ teamTwo.name }}
              </option>
            </select>
          </div>
        </section>
        <section class="w-full p-4 mb-8">
          <label for="date" class="create-match-label">Date:</label>
          <div class="relative w-full p-4 flex justify-start items-center">
            <input
              id="date"
              v-model="newMatch.date"
              type="text"
              name="date"
              placeholder="YYYY-MM-DD HH:MinMin:SS"
              class="create-match-input placeholder-glitter focus:placeholder-pureBlueLight"
              required
            />
            <i
              class="mdi mdi-close create-match-icon-clear transitioned-coloring"
              style="transform: translate(0, -50%)"
              @click.stop="clearInput"
            ></i>
          </div>
        </section>
        <hr />
        <section class="w-full p-8 flex justify-start items-center">
          <button
            type="submit"
            class="w-56 py-5 px-4 rounded-lg text-xl font-semibold bg-white border border-softRed text-softRed transitioned-coloring hover:bg-softRed hover:text-white focus:outline-none"
          >
            <span>Add</span>
          </button>
        </section>
      </form>
    </CardComponent>
  </div>
</template>

<script>
import CardComponent from '@/components/CardComponent'
export default {
  name: 'CreateMatch',
  components: {
    CardComponent,
  },
  async asyncData({ app }) {
    const teams = await app.$axios.$get('teams/filter')
    const sports = await app.$axios.$get('sports/filter')
    const currentTeamList = teams.data
    const currentSportList = sports.data
    return {
      teamOneList: currentTeamList,
      teamTwoList: currentTeamList,
      sportList: currentSportList,
    }
  },
  data() {
    return {
      newMatch: {
        sport_id: null,
        team_one: null,
        team_two: null,
        date: '',
      },
    }
  },
  computed: {
    // dateFormat() {
    //   this.newMatch.date = this.newMatch.date.replace(
    //     /^([\d]{4})([\d]{2})([\d]{2})$/,
    //     '$1/$2/$3'
    //   )
    //   return this.newMatch.date
    // },
  },
  methods: {
    // Clears input
    clearInput() {
      if (this.newMatch.date) {
        this.newMatch.date = ''
      }
    },
    onSportChange() {
      console.log(`Sport ID: ${this.newMatch.sport_id}`)
    },
    onTeamOneChange() {
      console.log(`Team one ID: ${this.newMatch.team_one}`)
    },
    onTeamTwoChange() {
      if (this.newMatch.team_one === this.newMatch.team_two) {
        this.newMatch.team_two = 0
        alert('Cannot select same teams')
      }
      console.log(`Team two ID: ${this.newMatch.team_two}`)
    },
    addnewMatch() {
      this.$axios
        .$post('matches/create', this.newMatch)
        .then((res) => {
          alert(`Successfully added match on ${res.data.date}`)
        })
        .catch((err) => {
          throw new Error(err)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.create-match-label {
  @apply block px-4 cursor-pointer font-semibold text-lg;
}
.create-match-input {
  @apply w-full rounded-lg py-3 px-6 border border-glitter bg-white text-xl tracking-wider text-gray-500;
}

.create-match-icon-clear {
  @apply absolute top-50% right-3% font-semibold text-3xl text-gray-500 cursor-pointer;
  &:hover {
    @apply-text-red-500;
  }
}

.transitioned-coloring {
  @apply transition-colors duration-200 ease-in-out;
}

input:-webkit-autofill {
  &:hover,
  &:focus,
  &:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }
}
</style>
