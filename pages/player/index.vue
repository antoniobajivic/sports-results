<template>
  <div class="create-team w-full flex-grow flex justify-around items-center">
    <CardComponent title="Create player">
      <form :model="newPlayer" class="w-full" @submit.prevent="createNewPlayer">
        <section class="w-full p-4 mb-8">
          <label for="player-name" class="create-player-label"
            >Player's name:</label
          >
          <div class="relative w-full p-4 flex justify-start items-center">
            <input
              id="player-name"
              v-model="newPlayer.namePlayer"
              type="text"
              name="player-name"
              placeholder="Enter your player's name"
              class="create-player-input placeholder-glitter focus:placeholder-pureBlueLight"
              required
            />
            <i
              class="mdi mdi-close create-player-icon-clear transitioned-coloring"
              style="transform: translate(0, -50%)"
              @click.stop="clearName"
            ></i>
          </div>
        </section>
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
  // async asyncData
  //
  components: {
    CardComponent,
  },
  data() {
    return {
      newPlayer: {
        namePlayer: '',
        /* Properties which every player has to have:
        faculty: '',
         sport: 'SPORT_NAME',
        // OR
        sport: {
         category: '',
          position: '',
         } 
        // We can either here (this page) set in which team each
        // player will play or add him in page teams/index.vue 
        // Potential problem: */
      },
    }
  },
  methods: {
    createPlayer() {
      this.$store
        .dispatch('createPlayer', this.newPlayer)
        .then((res) => {
          alert('You successfully created: ', res.data.data.name)
        })
        .catch((err) => {
          throw new Error(err)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.create-player-label {
  @apply block px-4 cursor-pointer font-semibold text-lg;
}
.create-player-input {
  @apply w-full rounded-lg py-3 px-6 border border-glitter bg-white text-xl tracking-wider text-gray-500;
}

.create-player-icon-clear {
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
