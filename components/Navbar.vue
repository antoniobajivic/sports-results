<template>
  <nav class="w-screen h-32">
    <div
      class="horizontal-bar flex w-full h-full items-center justify-between px-6 bg-pureBlue text-gray-700 border-b border-gray-200 z-10"
    >
      <div class="w3/12 flex items-center justify-start">
        <button
          class="mr-2 focus:outline-none"
          aria-label="Open Menu"
          @click="drawer"
        >
          <svg
            fill="none"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            class="w-10 h-10"
          >
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      <div class="w1/2 flex items-center justify-center">
        <span class="text-4xl text-center text-white text-bold"
          >Sport results</span
        >
      </div>
      <div class="w3/12 flex items-center justify-end">
        <div class="md:block md:flex md:justify-between md:bg-transparent">
          <button
            class="navbar-buttons-fend p-3 h-11 mr-2 bg-gray-300 hover:bg-gray-400 focus:bg-gray-400 focus:outline-none"
          >
            <svg
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-6 h-6 mr-2"
            >
              <path
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>{{ loggedInUser }}</span>
          </button>
          <button
            class="navbar-buttons-fend p-3 h-11 mr-2 text-white bg-orange-600 hover:bg-orange-700 focus:bg-orange-400 focus:outline-none"
            @click="logOut"
          >
            <p class="font-bold">
              <i class="mdi mdi-arrow-left-bold-box-outline"></i>
              <span>Logout</span>
            </p>
          </button>
        </div>
      </div>
    </div>

    <transition
      enter-class="opacity-0"
      enter-active-class="ease-out transition-medium"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-active-class="ease-out transition-medium"
      leave-to-class="opacity-0"
    >
      <div
        v-show="isOpen"
        class="z-10 fixed inset-0 transition-opacity"
        @keydown.esc="isOpen = false"
      >
        <div
          class="absolute inset-0 bg-black opacity-50"
          tabindex="0"
          @click="isOpen = false"
        ></div>
      </div>
    </transition>
    <aside
      class="transform top-0 left-0 w-64 bg-white fixed h-full ease-in-out transition-all duration-300 z-30"
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <span class="flex w-full h-32 justify-between items-center p-4 border-b">
        <button class="flex items-center p-2 h-28" @click="isOpen = false">
          <i class="mdi mdi-arrow-collapse-left"></i>
        </button>
        <span
          class="flex-grow flex justify-center items-center text-4xl text-center"
          >Categories</span
        >
      </span>
      <nuxt-link
        class="flex items-center p-4 hover:bg-indigo-500 hover:text-white"
        to="/dashboard"
        ><span class="mr-2">
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            class="w-6 h-6"
          >
            <path
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            ></path>
          </svg>
        </span>
        <span>Home</span></nuxt-link
      >
      <nuxt-link
        class="flex items-center p-4 hover:bg-indigo-500 hover:text-white"
        to="/groups"
        ><span class="mr-2">
          <svg
            fill="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            class="w-6 h-6"
          >
            <path
              fill="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12,5A3.5,3.5 0 0,0 8.5,8.5A3.5,3.5 0 0,0 12,12A3.5,3.5 0 0,0 15.5,8.5A3.5,3.5 0 0,0 12,5M12,7A1.5,1.5 0 0,1 13.5,8.5A1.5,1.5 0 0,1 12,10A1.5,1.5 0 0,1 10.5,8.5A1.5,1.5 0 0,1 12,7M5.5,8A2.5,2.5 0 0,0 3,10.5C3,11.44 3.53,12.25 4.29,12.68C4.65,12.88 5.06,13 5.5,13C5.94,13 6.35,12.88 6.71,12.68C7.08,12.47 7.39,12.17 7.62,11.81C6.89,10.86 6.5,9.7 6.5,8.5C6.5,8.41 6.5,8.31 6.5,8.22C6.2,8.08 5.86,8 5.5,8M18.5,8C18.14,8 17.8,8.08 17.5,8.22C17.5,8.31 17.5,8.41 17.5,8.5C17.5,9.7 17.11,10.86 16.38,11.81C16.5,12 16.63,12.15 16.78,12.3C16.94,12.45 17.1,12.58 17.29,12.68C17.65,12.88 18.06,13 18.5,13C18.94,13 19.35,12.88 19.71,12.68C20.47,12.25 21,11.44 21,10.5A2.5,2.5 0 0,0 18.5,8M12,14C9.66,14 5,15.17 5,17.5V19H19V17.5C19,15.17 14.34,14 12,14M4.71,14.55C2.78,14.78 0,15.76 0,17.5V19H3V17.07C3,16.06 3.69,15.22 4.71,14.55M19.29,14.55C20.31,15.22 21,16.06 21,17.07V19H24V17.5C24,15.76 21.22,14.78 19.29,14.55M12,16C13.53,16 15.24,16.5 16.23,17H7.77C8.76,16.5 10.47,16 12,16Z"
            />
          </svg>
        </span>
        <span>Groups</span></nuxt-link
      >
      <nuxt-link
        class="flex items-center p-4 hover:bg-indigo-500 hover:text-white"
        to="/teams"
        ><span class="mr-2">
          <svg
            fill="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            class="w-6 h-6"
          >
            <path
              fill="currentColor"
              d="M13.07 10.41A5 5 0 0 0 13.07 4.59A3.39 3.39 0 0 1 15 4A3.5 3.5 0 0 1 15 11A3.39 3.39 0 0 1 13.07 10.41M5.5 7.5A3.5 3.5 0 1 1 9 11A3.5 3.5 0 0 1 5.5 7.5M7.5 7.5A1.5 1.5 0 1 0 9 6A1.5 1.5 0 0 0 7.5 7.5M16 17V19H2V17S2 13 9 13 16 17 16 17M14 17C13.86 16.22 12.67 15 9 15S4.07 16.31 4 17M15.95 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13Z"
            />
          </svg>
        </span>
        <span>Teams</span></nuxt-link
      >
      <nuxt-link
        class="flex items-center p-4 hover:bg-indigo-500 hover:text-white"
        to="/player"
        ><span class="mr-2">
          <svg
            fill="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            class="w-6 h-6"
          >
            <path
              fill="currentColor"
              d="M15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4M15,5.9C16.16,5.9 17.1,6.84 17.1,8C17.1,9.16 16.16,10.1 15,10.1A2.1,2.1 0 0,1 12.9,8A2.1,2.1 0 0,1 15,5.9M4,7V10H1V12H4V15H6V12H9V10H6V7H4M15,13C12.33,13 7,14.33 7,17V20H23V17C23,14.33 17.67,13 15,13M15,14.9C17.97,14.9 21.1,16.36 21.1,17V18.1H8.9V17C8.9,16.36 12,14.9 15,14.9Z"
            />
          </svg>
        </span>
        <span>Player</span></nuxt-link
      >
    </aside>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      isOpen: {
        type: Boolean,
        default: false,
      },
    }
  },
  computed: {
    ...mapGetters(['loggedInUser']),
  },
  // I would rather translate whole main page than hide part of it
  watch: {
    isOpen: {
      immediate: true,
      handler(isOpen) {
        console.log(process.client)
        if (process.client) {
          // const layoutBody = document.querySelector('.default-container')
          const currentPageBody = document.querySelector(
            '.container-translatex'
          )
          const horizontalBar = document.querySelector('.horizontal-bar')
          if (isOpen) {
            // layoutBody.style.setProperty('transform', 'translateX(16rem)')
            currentPageBody.style.setProperty('transform', 'translateX(16rem)')
            horizontalBar.style.setProperty('transform', 'translateX(16rem)')
            // horizontalBar.style.setProperty('width:', 'translate(16rem)')
          } else {
            // layoutBody.style.removeProperty('transform')
            currentPageBody.style.transform && horizontalBar.style.transform
              ? currentPageBody.style.removeProperty('transform') &&
                horizontalBar.style.removeProperty('transform')
              : this.drawer()
          }
        }
      },
    },
  },
  created() {
    this.drawer()
  },
  mounted() {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27 && this.isOpen) this.isOpen = false
    })
  },
  methods: {
    logOut() {
      this.$store.commit('SET_USER', null)
      this.$store.commit('SET_LOGGEDIN', false)
      this.$auth.logout()
    },
    drawer() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>

<style>
.navbar-buttons-fend {
  @apply flex items-center font-medium text-center text-xl rounded;
}
</style>
