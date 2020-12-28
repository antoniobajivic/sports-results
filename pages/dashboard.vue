<template>
  <div class="w-5/6 flex flex-col mx-auto tracking-wider text-white">
    <h1
      class="w-full text-4xl font-bold uppercase text-center text-black py-2 px-4"
    >
      Welcome {{ loggedInUser }}
    </h1>
    <!-- <button @click="$auth.logout">Logout</button> -->
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
          team-name="Osijek"
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
    </div>
  </div>
</template>

<script>
import Team from '@/components/Team'
import Player from '@/components/Player'
import { mapGetters } from 'vuex'
export default {
  components: { Team, Player },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  data() {
    return {
      user: {
        email: '',
      },
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
    checkLoggedIn() {
      console.log(this.$store.state.loggedInUser)
    },
  },
}
</script>

<style lang="scss" scoped></style>
