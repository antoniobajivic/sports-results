<template>
  <div class="create-faculty w-full flex-grow flex justify-around items-center">
    <CardComponent title="Add faculty">
      <form :model="newFaculty" class="w-full" @submit.prevent="addNewFaculty">
        <section class="w-full p-4 mb-8">
          <label for="faculty-name" class="create-faculty-label">Name:</label>
          <div class="relative w-full p-4 flex justify-start items-center">
            <input
              id="faculty-name"
              v-model="newFaculty.name"
              type="text"
              name="faculty-name"
              placeholder="Enter new faculty's name"
              class="create-faculty-input placeholder-glitter focus:placeholder-pureBlueLight"
              required
            />
            <i
              class="mdi mdi-close create-faculty-icon-clear transitioned-coloring"
              style="transform: translate(0, -50%)"
              @click.stop="clearInput"
            ></i>
          </div>
        </section>
        <section class="w-full p-4 mb-8">
          <label for="faculty-name" class="create-faculty-label">City:</label>
          <div class="relative w-full p-4 flex justify-start items-center">
            <input
              id="faculty-name"
              v-model="newFaculty.city"
              type="text"
              name="faculty-name"
              placeholder="Enter faculty's city"
              class="create-faculty-input placeholder-glitter focus:placeholder-pureBlueLight"
              required
            />
            <i
              class="mdi mdi-close create-faculty-icon-clear transitioned-coloring"
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
  name: 'AddFaculty',
  components: {
    CardComponent,
  },
  data() {
    return {
      newFaculty: {
        name: '',
        city: '',
      },
    }
  },
  methods: {
    // Clears input
    clearInput() {
      if (this.newFaculty.name) {
        this.newFaculty.name = ''
      }
    },
    addNewFaculty() {
      this.$axios
        .$post('faculties/create', this.newFaculty)
        .then((res) => {
          alert(`Successfully added ${res.data.name}, ${res.data.city}`)
        })
        .catch((err) => {
          throw new Error(err)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.create-faculty-label {
  @apply block px-4 cursor-pointer font-semibold text-lg;
}
.create-faculty-input {
  @apply w-full rounded-lg py-3 px-6 border border-glitter bg-white text-xl tracking-wider text-gray-500;
}

.create-faculty-icon-clear {
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
