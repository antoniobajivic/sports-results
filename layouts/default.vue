<template>
  <div class="w-screen h-screen flex flex-col">
    <Navbar />
    <Nuxt class="container-translatex" />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  components: { Navbar },
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
