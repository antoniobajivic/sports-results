<template>
  <!-- component -->
  <div class="h-full text-gray-900 bg-gray-200">
    <div class="p-4 flex">
      <h1 class="text-3xl">Faculties</h1>
    </div>
    <div class="px-3 py-4 flex justify-center">
      <table class="w-full text-md bg-white shadow-md rounded mb-4">
        <tbody>
          <tr class="border-b">
            <th class="text-left p-3 px-5">ID</th>
            <th class="text-left p-3 px-5">Name</th>
            <th class="text-left p-3 px-5">City</th>
            <th class="text-right p-3 px-5">Operations</th>
          </tr>
          <tr
            v-for="(faculty, index) in facultyList"
            :key="index"
            class="border-b hover:bg-orange-100 bg-gray-100"
          >
            <td class="p-3 px-5">
              <span class="bg-transparent">{{ faculty.id }}</span>
            </td>
            <td class="p-3 px-5">
              <span class="bg-transparent">{{ faculty.name }}</span>
            </td>
            <td class="p-3 px-5">
              <span class="bg-transparent">{{ faculty.city }}</span>
            </td>
            <td class="p-3 px-5 flex justify-end">
              <button
                type="button"
                class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                @click="deleteFaculty(index)"
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
    const responseFaculties = await app.$axios.$get('faculties/filter')
    return {
      facultyList: responseFaculties.data,
    }
  },
  data() {
    return {
      facultyList: [],
    }
  },
  methods: {
    async deleteFaculty(index) {
      const facultyID = this.facultyList[index].id
      const responseData = await this.$axios.$delete(
        `faculties/delete/${facultyID}`
      )
      if (responseData.data) {
        this.facultyList.splice(index, 1)
        alert('Successfully removed faculty')
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
