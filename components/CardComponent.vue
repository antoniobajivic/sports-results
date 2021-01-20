<template>
  <div
    class="w-full max-w-6xl flex flex-col items-center sm:w-38rem bg-white border-2 rounded-3xl tracking-wider"
  >
    <header class="w-full p-8 flex justify-start items-center border-b">
      <p class="text-2xl text-black">
        <span>{{ title }}</span>
      </p>
    </header>

    <div
      ref="cardContent"
      class="w-full flex flex-col items-center tracking-wider p-4"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
  props: {
    title: {
      type: String,
      default: null,
    },
  },
}
</script>

<style></style>
