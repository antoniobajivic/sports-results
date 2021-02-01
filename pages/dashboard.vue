<template>
  <div class="w-full flex flex-col flex-grow mx-auto tracking-wider text-white">
    <div
      class="w-full h-full flex flex-col justify-center items-center font-bold uppercase text-center text-black py-2 px-4"
    >
      <h1 class="text-4xl">Welcome {{ loggedInUser }} to</h1>
      <span class="span__header">Student sport results</span>
      <div class="relative w-full p-4 flex justify-center items-center">
        <select
          id="select-sport"
          v-model="sport_id"
          name="select-sport"
          placeholder="Select sport"
          class="create-team-select text-black placeholder-glitter focus:placeholder-pureBlueLight"
          required
          @change="onSportChange"
        >
          <option
            v-for="(sport, index) in sportData"
            :key="index"
            :value="sport.id"
          >
            {{ sport.id }}. {{ sport.name }} - Min. players:
            {{ sport.minPlayers }}
          </option>
        </select>
        <button
          type="button"
          class="text-sm bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          @click="goToSportMatches"
        >
          View matches
        </button>
      </div>
    </div>
    <!-- <button @click="$auth.logout">Logout</button>
    <h1 class="w-full text-4xl font-bold uppercase text-black py-2 px-4">
      Hrvatska Nogometna Liga:
    </h1>
    <div>
      <Team team-name="Osijek" class="border-green-500">
        <Player
          class="bg-green-500"
          player-name="Škorić Mile"
          team-name="Osijek"
        ></Player>
        <Player
          class="bg-green-500"
          player-name="Majstorović Ante"
          team-name="Osijek"
        ></Player>
        <Player
          class="bg-green-500"
          player-name="Vuković Josip"
          team-name="Osijek "
        ></Player>
      </Team>
    </div>
    <div>
      <Team team-name="Rijeka" class="border-softRed">
        <Player
          class="bg-softRed"
          player-name="Tomečak Ivan"
          team-name="Rijeka"
        ></Player>
        <Player
          class="bg-softRed"
          player-name="Galović Nino"
          team-name="Rijeka"
        ></Player>
        <Player
          class="bg-softRed"
          player-name="Smolčić Hrvoje"
          team-name="Rijeka"
        ></Player>
      </Team>
    </div>
    <div>
      <Team team-name="Dinamo Zagreb" class="border-pureBlueLight">
        <Player
          class="bg-pureBlueLight"
          player-name="Oršić Mislav"
          team-name="Dinamo Zagreb"
        ></Player>
        <Player
          class="bg-pureBlueLight"
          player-name="Petković Bruno"
          team-name="Dinamo Zagreb"
        ></Player>
        <Player
          class="bg-pureBlueLight"
          player-name="Hajrović Izet"
          team-name="Dinamo Zagreb"
        ></Player>
      </Team>
    </div> -->
  </div>
</template>

<script>
// import Team from '@/components/Team'
// import Player from '@/components/Player'
import { mapGetters } from 'vuex'
export default {
  // components: { Team, Player },
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
  // watch: {
  //   isOpen: {
  //     immediate: true,
  //     handler(isOpen) {
  //       if (process.client) {
  //         if (isOpen) document.body.style.setProperty('overflow', 'hidden')
  //         else document.body.style.removeProperty('overflow')
  //       }
  //     },
  //   },
  // },
  methods: {
    // checkLoggedIn() {
    //   console.log(this.$store.state.loggedInUser)
    // },
    onSportChange() {
      console.log(`Sport ID: ${this.sport_id}`)
    },
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
.span__header {
  font-size: 4.5rem !important;
}
</style>
