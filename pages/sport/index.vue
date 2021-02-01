<template>
  <!-- component -->
  <div class="h-full text-gray-900 bg-gray-200">
    <div class="p-4 flex">
      <h1 class="text-3xl">Sports</h1>
    </div>
    <div class="px-3 py-4 flex justify-center">
      <table class="w-full text-md bg-white shadow-md rounded mb-4">
        <tbody>
          <tr class="border-b">
            <th class="text-left p-3 px-5">ID</th>
            <th class="text-left p-3 px-5">Name</th>
            <!-- <th class="text-left p-3 px-5">Faculty</th> -->
            <th class="text-left p-3 px-5">Min players</th>
            <th class="text-right p-3 px-5">Operations</th>
          </tr>
          <tr
            v-for="(sport, index) in sportData"
            :key="index"
            class="border-b hover:bg-orange-100 bg-gray-100"
          >
            <td class="p-3 px-5">
              <span class="bg-transparent">{{ sport.id }}</span>
            </td>
            <td class="p-3 px-5">
              <span class="bg-transparent">{{ sport.name }}</span>
            </td>
            <td class="p-3 px-5">
              <span class="bg-transparent">{{ sport.minPlayers }}</span>
            </td>
            <!-- <td class="p-3 px-5">
              <span class="bg-transparent">{{
                filterFaculties[index].faculty_name
              }}</span>
            </td> -->
            <!-- <td class="p-3 px-5">
                        <select value="user.role" class="bg-transparent">
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                        </select>
                    </td> -->
            <td class="p-3 px-5 flex justify-end">
              <button
                type="button"
                class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                @click="deleteSport(index)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ app }) {
    const responseSports = await app.$axios.$get('sports/filter')

    return {
      sportData: responseSports.data,
    }
  },
  data() {
    return {
      sportData: {
        id: '',
        name: '',
        minPlayers: 0,
      },
    }
  },
  methods: {
    async deleteSport(index) {
      const sportID = this.sportData[index].id
      const responseData = await this.$axios.$delete(`sports/delete/${sportID}`)
      if (responseData.data) {
        alert('Successfully deleted sport')
        this.sportData.splice(index, 1)
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
