<template>
<div>
<div v-if="registerSelected" class="login-card">
  <b-card
    title="Register"
    img-src="../assets/logotitle.png"
    img-alt="Image"
    img-top
    style="max-width: 20rem;"
    class="mb-2"
  >
    <Register />
        <br>
  <b-link v-on:click="toggleLogin" variant="primary"> Login </b-link>
  </b-card>
  </div>
  <div v-else class="login-card">
  <b-card
    title="Login"
    img-src="../assets/logotitle.png"
    img-alt="Image"
    img-top
    style="max-width: 20rem;"
    class="mb-2"
  >
    <Login />
    <br>
  <b-link v-on:click="toggleLogin" variant="primary"> Register </b-link>
  </b-card>
  </div>
  </div>
</template>

<script>
import Login from "./Login.vue";
import Register from "./Register.vue"
export default {
  name: "LoginPanel",
  components: {
    Login,
    Register
  },
  data() {
      return {
          registerSelected: false
      }
  },
  methods: {
      toggleLogin: function() {
          this.registerSelected = !this.registerSelected
      }
  }

};
</script>

<style scoped>
.login-card {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80vh;
}
</style>