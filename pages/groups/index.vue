<template>
  <div class="h-full text-gray-900 bg-gray-200">
    <div class="p-4 flex">
      <h1 class="text-3xl">Groups</h1>
    </div>
    <div class="px-3 py-4 flex justify-center">
      <table class="w-full text-md bg-white shadow-md rounded mb-4">
        <tbody>
          <tr class="border-b">
            <th class="text-left p-3 px-5">ID</th>
            <th class="text-left p-3 px-5">Name</th>
            <!-- <th class="text-left p-3 px-5">Faculty</th>
            <th class="text-left p-3 px-5">Group</th> 
            v-for="(group, index) in groupData"
            :key="index"{{ group.id }}{{ group.name }}
            -->
            <th class="text-left p-3 px-5">Teams</th>
            <th class="text-right p-3 px-5">Operations</th>
          </tr>
          <tr class="border-b hover:bg-orange-100 bg-gray-100">
            <td class="p-3 px-5">
              <span class="bg-transparent">1</span>
            </td>
            <td class="p-3 px-5">
              <span class="bg-transparent">GRUPA 1</span>
            </td>
            <!-- <td class="p-3 px-5">
              <span class="bg-transparent">{{ team.faculty }}</span>
            </td> -->
            <!-- <td class="p-3 px-5">
              <span class="bg-transparent">GROUP</span>
            </td> -->
            <td class="p-3 px-5">
              <select class="bg-transparent">
                <option value="team_1">Team 1</option>
                <option value="team_2">Team 2</option>
                <option value="team_3">Team 2</option>
                <option value="team_4">Team 2</option>
              </select>
            </td>
            <td class="p-3 px-5 flex justify-end">
              <button
                type="button"
                class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
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
export default {}
</script>

<style></style>
