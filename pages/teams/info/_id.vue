<template>
  <div>
    <CardComponent title="Team info">
      <section class="w-full mb-8 p-4">
        <label for="team-name">Name: </label>
        <div class="w-full p-4 flex justify-start items-start">
          <span>{{ teamInfo.name }}</span>
        </div>
      </section>
      <section class="w-full mb-8 p-4">
        <label for="team-faculty">Faculty: </label>
        <div class="w-full p-4 flex justify-start items-start">
          <span>{{ teamInfo.faculty }}</span>
        </div>
      </section>
      <section class="w-full mb-8 p-4">
        <label for="team-players">Players: </label>
        <div class="w-full p-4 flex justify-start items-center">
          <ul>
            <li v-for="(player, index) in teamInfo.players" :key="index">
              <span>{{ player.name }}</span>
            </li>
          </ul>
        </div>
      </section>
    </CardComponent>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CardComponent from '@/components/CardComponent'
export default {
  components: {
    CardComponent,
  },
  computed: {
    ...mapGetters(['teamInfo']),
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped></style>
