<template>
  <div class="flex w-full h-full items-center justify-center">
    <CardComponent title="Create Sport">
      <form
        id="sport__form"
        :model="newSport"
        class="w-full"
        @submit.prevent="createSport"
      >
        <section class="mb-8 p-4 w-full">
          <label for="sportName" class="create-sport-label">Name:</label>
          <div class="relative w-full">
            <input
              id="sportName"
              v-model.trim="newSport.name"
              type="text"
              name="sportName"
              placeholder="Enter sport name"
              class="create-sport-input placeholder-glitter focus:placeholder-pureBlueLight"
            />
            <i
              class="mdi mdi-close icon-clear transitioned-coloring"
              style="transform: translate(0, -50%)"
              @click.stop="clearSportName"
            ></i>
          </div>
        </section>

        <section class="mb-8 p-4 w-full">
          <label for="sportPlayerCount" class="create-sport-label"
            >Max number of players:</label
          >
          <input
            id="sportPlayerCount"
            v-model.number="newSport.minPlayers"
            type="number"
            name="sportName"
            min="0"
            placeholder="Enter sport name"
            class="create-sport-input placeholder-glitter focus:placeholder-pureBlueLight"
          />
        </section>

        <section class="flex justify-around items-center w-full">
          <button
            type="submit"
            :disabled="!inputsValid"
            class="w-32 py-2 px-4 rounded-lg text-xl font-semibold bg-white border border-softRed text-softRed transitioned-coloring focus:outline-none"
            :class="
              inputsValid
                ? 'hover:bg-softRed hover:text-white'
                : 'opacity-50 cursor-default'
            "
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
  data() {
    return {
      newSport: {
        name: '',
        minPlayers: 0,
      },
    }
  },
  computed: {
    inputsValid() {
      return this.newSport.name && this.newSport.minPlayers > 0
    },
  },
  methods: {
    clearSportName() {
      if (this.newSport.name) {
        this.newSport.name = ''
      }
    },
    async createSport() {
      try {
        const response = await this.$axios.$post('sports/create', this.newSport)
        alert(`New sport named ${response.data.name} successfully created!`)
        document.getElementById('sport__form').reset()
      } catch (error) {
        if (error.message.includes('500')) {
          alert(
            "You cannot create team because it already exists. Please change the team's name"
          )
        }
      }
    },
  },
}
</script>
<style scoped>
.create-sport-label {
  @apply block cursor-pointer font-semibold text-lg;
}
.create-sport-input {
  @apply w-full rounded-lg py-3 px-6 border border-glitter bg-white text-xl tracking-wider text-gray-500;
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
