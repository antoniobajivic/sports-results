<template>
  <div>
    <Navbar />
    <Nuxt />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  components: { Navbar },
  // data() {
  //   return {
  //     username: '',
  //   }
  // },
  // mounted(){
  //   this.setUser()
  // },
}
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
