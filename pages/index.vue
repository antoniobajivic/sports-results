<template>
  <div>
    <form @submit.prevent="login">
      <label for="email">
        <input id="email" v-model="userForm.email" type="email" name="email" />
      </label>
      <label for="password">
        <input
          id="password"
          v-model="userForm.password"
          type="password"
          name="password"
        />
      </label>
      <hr />
      <button>Login</button>
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
          this.$store.commit('SET_USER', res.data.data)
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
  },
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
