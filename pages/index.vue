<template>
  <div class="h-screen w-full flex items-center justify-center bg-blackOverlay">
    <form @submit.prevent="login" class="relative flex flex-col items-center w-28rem sm:w-38rem bg-white rounded-3xl px-12 py-8 tracking-wider">
      <h1 class="text-2xl text-black font-semibold mb-8">Authentication</h1>
      <section class="mb-8 w-full">
        <label for="email" class="login-form-label">Email:</label>
        <div class="relative w-full">
          <input id="email" type="email" name="email" placeholder="Enter your email"
                 v-model="userForm.email" class="login-form-input placeholder-glitter focus:placeholder-pureBlueLight"/>
          <i class="mdi mdi-close login-form-icon-clear transitioned-coloring" @click.stop="clearEmail" style="transform: translate(0,-50%)"></i>
        </div>

      </section>
      <section class="mb-12 w-full">
        <label for="password" class="login-form-label">Password</label>
        <div class="relative w-full">
          <input id="password" type="password" name="password" placeholder="Enter your password"
                 v-model="userForm.password" class="login-form-input placeholder-glitter focus:placeholder-pureBlueLight"/>
          <i class="mdi mdi-close login-form-icon-clear transitioned-coloring" @click.stop="clearPassword" style="transform: translate(0,-50%)"></i>
        </div>
      </section>

      <section class="flex justify-around items-center w-full">
        <button class="w-32 py-2 px-4 rounded-lg text-xl font-semibold bg-white border border-softRed text-softRed transitioned-coloring hover:bg-softRed hover:text-white focus:outline-none">
          <span>Log in</span>
        </button>
      </section>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userForm: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    login() {
      this.$auth
        .login({ data: this.userForm })
        .then((res) => {
          console.log(res.data.data.user)
          // this.$auth.setUser(res.data.data)
          this.$store.commit('SET_LOGGEDIN', true)
          this.$store.commit('SET_USER', res.data.data.user)
        })
        .catch((err) => {
          throw new Error(err)
        })
      // this.$axios
      //   .$post('users/login', this.userForm)
      //   .then((res) => {
      //     this.$router.push('/teams')
      //   })
      //   .catch((err) => {
      //     throw new Error(err)
      //   })
    },
    clearEmail(){
      if(this.userForm.email){
        this.userForm.email = ""
      }
    },

    clearPassword(){
      if(this.userForm.password){
        this.userForm.password = ""
      }
    }
  },
}
</script>

<style scoped>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
  .login-form-label{
    @apply block cursor-pointer font-semibold text-lg;
  }

  .login-form-input{
    @apply w-full rounded-lg py-3 px-6 border border-glitter bg-white text-xl tracking-wider text-gray-500;
  }

  .login-form-input:focus{
    @apply border-pureBlueLight outline-none text-pureBlueLight;
  }

  .login-form-icon-clear{
    @apply absolute top-50% right-3% font-semibold text-3xl text-gray-500 cursor-pointer;
  }

  .login-form-icon-clear:hover{
    @apply text-red-500;
  }

  .transitioned-coloring{
    @apply transition-colors duration-200 ease-in-out;
  }

  /* Change the white to any color ;) */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }

</style>
