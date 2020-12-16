<template>
  <div>
    <h1>
      Welcome <span>{{ loggedInUser.user.username }}</span>
    </h1>
    <!-- <button @click="$auth.logout">Logout</button> -->
    <h1>Hrvatska Nogometna Liga</h1>
    <div class="team">
      <Players team-name="Osijek">
        <Player
          player-name="Korič M."
          team-name="Osijek"
          team-city="Osijek"
        ></Player>
        <Player
          player-name="Majstorović A."
          team-name="Osijek"
          team-city="Osijek"
        ></Player>
        <Player
          player-name="Vuković J."
          team-name="Osijek"
          team-city="Osijek"
        ></Player>
      </Players>
    </div>
    <div class="team">
      <Players team-name="Rijeka">
        <Player
          player-name="Tomečak I."
          team-name="Rijeka"
          team-city="Rijeka"
        ></Player>
        <Player
          player-name="Galović N."
          team-name="Rijeka"
          team-city="Rijeka"
        ></Player>
        <Player
          player-name="Smolčić H."
          team-name="Rijeka"
          team-city="Rijeka"
        ></Player>
      </Players>
    </div>
    <div class="team">
      <Players team-name="Dinamo Zagreb">
        <Player
          player-name="Oršić M."
          team-name="Dinamo Zagreb"
          team-city="Zagreb"
        ></Player>
        <Player
          player-name="Petković B."
          team-name="Dinamo Zagreb"
          team-city="Zagreb"
        ></Player>
        <Player
          player-name="Hajrović I."
          team-name="Dinamo Zagreb"
          team-city="Zagreb"
        ></Player>
      </Players>
    </div>
  </div>
</template>

<script>
import Players from '@/components/Players'
import Player from '@/components/Player'
import { mapGetters } from 'vuex'
export default {
  components: { Players, Player },
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
  methods: {
    checkLoggedIn() {
      console.log(this.$store.state.loggedInUser)
    },
  },
}
</script>

<style lang="scss" scoped></style>
