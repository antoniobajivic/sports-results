<template>
  <nav class="w-screen h-32">
    <div
      class="horizontal-bar flex w-full h-full items-center justify-between px-6 bg-pureBlue text-gray-700 border-b border-gray-200 z-10"
    >
      <div class="w-1/4 flex items-center justify-start">
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
      <div class="w-1/2 flex items-center justify-center">
        <span class="text-4xl text-center text-white text-bold"
          >Sport results</span
        >
      </div>
      <div class="w-1/4 flex items-center justify-end">
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
        class="flex relative items-center p-4 hover:bg-indigo-500 hover:text-white"
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
        <span>Teams</span>
        <span class="flex-grow flex justify-end items-center">
          <svg
            fill="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            class="w-6 h-6"
            @click="toggleTeamsSubmenu"
          >
            <path
              fill="currentColor"
              d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M7,10L12,15L17,10H7Z"
            />
          </svg>
        </span>
        <ul
          v-if="openTeamsSubmenu"
          class="absolute w-full h-12 absolute__coords text-black"
        >
          <nuxt-link to="/teams">
            <li
              class="flex items-center px-4 py-2 hover:bg-indigo-500 hover:text-white"
            >
              <span>All teams</span>
            </li>
          </nuxt-link>
          <nuxt-link to="/teams/create">
            <li
              class="flex items-center px-4 py-2 hover:bg-indigo-500 hover:text-white"
            >
              <span>Create team</span>
            </li>
          </nuxt-link>
        </ul>
      </nuxt-link>
      <nuxt-link
        :class="{ transform__y: openTeamsSubmenu }"
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
      <nuxt-link
        :class="{ transform__y: openTeamsSubmenu }"
        class="flex items-center p-4 hover:bg-indigo-500 hover:text-white"
        to="/faculty"
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
              d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3M18.82 9L12 12.72L5.18 9L12 5.28L18.82 9M17 16L12 18.72L7 16V12.27L12 15L17 12.27V16Z"
            />
          </svg>
        </span>
        <span>Faculty</span></nuxt-link
      >
      <nuxt-link
        :class="{ transform__y: openTeamsSubmenu }"
        class="flex relative items-center p-4 hover:bg-indigo-500 hover:text-white"
        to="/match"
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
              d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3M18.82 9L12 12.72L5.18 9L12 5.28L18.82 9M17 16L12 18.72L7 16V12.27L12 15L17 12.27V16Z"
            />
          </svg>
        </span>
        <span>Match</span>
        <span class="flex-grow flex justify-end items-center">
          <svg
            fill="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            class="w-6 h-6"
            @click="toggleMatchSubmenu"
          >
            <path
              fill="currentColor"
              d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M7,10L12,15L17,10H7Z"
            />
          </svg>
        </span>
        <ul
          v-if="openMatchSubmenu"
          class="absolute w-full h-12 absolute__coords text-black"
        >
          <nuxt-link to="/match">
            <li
              class="flex items-center px-4 py-2 hover:bg-indigo-500 hover:text-white"
            >
              <span>Create match</span>
            </li>
          </nuxt-link>
          <nuxt-link to="/match/event">
            <li
              class="flex items-center px-4 py-2 hover:bg-indigo-500 hover:text-white"
            >
              <span>Add event</span>
            </li>
          </nuxt-link>
        </ul>
      </nuxt-link>
      <nuxt-link
        :class="[
          {
            transform__y: openTeamsSubmenu || openMatchSubmenu,
          },
        ]"
        to="/sport/create"
        class="flex items-center p-4 hover:bg-indigo-500 hover:text-white"
      >
        <span class="mr-2">
          <svg
            fill="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            class="w-6 h-6"
          >
            <path
              d="M3.02,15.62c-0.08,2.42,0.32,4.34,0.67,4.69s2.28,0.76,4.69,0.67L3.02,15.62z"
            />
            <path
              d="M13.08,3.28C10.75,3.7,8.29,4.62,6.46,6.46s-2.76,4.29-3.18,6.62l7.63,7.63c2.34-0.41,4.79-1.34,6.62-3.18 s2.76-4.29,3.18-6.62L13.08,3.28z M9.9,15.5l-1.4-1.4l5.6-5.6l1.4,1.4L9.9,15.5z"
            />
            <path
              d="M20.98,8.38c0.08-2.42-0.32-4.34-0.67-4.69s-2.28-0.76-4.69-0.67L20.98,8.38z"
            />
            />
          </svg>
        </span>
        <span>Sport</span>
      </nuxt-link>
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
      openTeamsSubmenu: false,
      openGroupsSubmenu: false,
      openMatchSubmenu: false,
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
        if (process.client) {
          // const layoutBody = document.querySelector('.default-container')
          const currentPageBody = document.querySelector(
            '.container-translatex'
          )
          const horizontalBar = document.querySelector('.horizontal-bar')
          if (currentPageBody !== null) {
            if (isOpen) {
              // layoutBody.style.setProperty('transform', 'translateX(16rem)')
              currentPageBody.style.setProperty(
                'transform',
                'translateX(16rem)'
              )
              horizontalBar.style.setProperty('transform', 'translateX(16rem)')
              // horizontalBar.style.setProperty('width:', 'translate(16rem)')
            } else {
              // layoutBody.style.removeProperty('transform')
              currentPageBody.style.transform && horizontalBar.style.transform
                ? currentPageBody.style.removeProperty('transform') &&
                  horizontalBar.style.removeProperty('transform')
                : this.drawer()
            }
          } else {
            isOpen = false
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
    // toggleGroupsSubmenu() {
    //   this.openGroupsSubmenu = !this.openGroupsSubmenu
    //   if (this.openGroupsSubmenu) {
    //     this.openTeamsSubmenu = false
    //   }
    // },
    toggleTeamsSubmenu() {
      this.openTeamsSubmenu = !this.openTeamsSubmenu
      if (this.openTeamsSubmenu) {
        // this.openGroupsSubmenu = false
        this.openMatchSubmenu = false
      }
    },
    toggleMatchSubmenu() {
      this.openMatchSubmenu = !this.openMatchSubmenu
      if (this.openMatchSubmenu) {
        // this.openGroupsSubmenu = false
        this.openTeamsSubmenu = false
      }
    },
  },
}
</script>

<style>
.navbar-buttons-fend {
  @apply flex items-center font-medium text-center text-xl rounded;
}
.absolute__coords {
  top: 3.45rem;
  left: 0;
}
.transform__y {
  @apply transform translate-y-20;
}
</style>
