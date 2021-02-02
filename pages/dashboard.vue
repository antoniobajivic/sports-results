<template>
  <div class="w-full flex flex-col flex-grow mx-auto tracking-wider text-white">
    <div
      class="w-full h-full flex flex-col justify-center items-center font-bold uppercase text-center text-black py-2 px-4"
    >
      <h1 class="text-4xl">Welcome {{ loggedInUser }} to</h1>
      <span class="span__header">Student sport results</span>
      <div class="relative w-80 p-4 flex justify-center items-center">
        <label for="select-sport" class="mr-2"
          >Select sport to view matches:</label
        >
        <select
          id="select-sport"
          v-model="sport_id"
          name="select-sport"
          placeholder="Select sport"
          class="create-team-select text-black placeholder-glitter focus:placeholder-pureBlueLight mr-2"
          required
        >
          <option
            v-for="(sport, index) in sportData"
            :key="index"
            :value="sport.id"
          >
            {{ sport.name }} - Min. players:
            {{ sport.minPlayers }}
          </option>
        </select>
        <button
          type="button"
          class="text-lg h-full bg-pureBlue hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          @click="goToSportMatches"
        >
          View
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  async asyncData({ app }) {
    const responseSports = await app.$axios.$get('sports/filter')
    return {
      sportData: responseSports.data,
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  data() {
    return {
      user: {
        email: '',
      },
      sport_id: null,
    }
  },
  methods: {
    goToSportMatches() {
      if (this.sport_id) {
        this.$router.push(`match/sport-matches/${this.sport_id}`)
      } else {
        alert('Select sport category please!')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.create-team-select {
  @apply w-full p-2 border-2 rounded-lg text-xl text-black text-center;
  &:focus {
    outline: none;
  }
}
.span__header {
  font-size: 4.5rem !important;
}
</style>
