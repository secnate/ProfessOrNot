<template>
  <div class="login-card">
    <b-card
      :title="cardTitle"
      img-src="../assets/logotitle.svg"
      img-alt="Image"
      img-topb
      style= "padding: 15px; min-width: 350px; max-width: 350px;"
      class="mb-2"
    >
      <div v-if="loginAlert">
        <b-alert show variant="danger">{{loginAlert}}</b-alert>
      </div>
      <div v-if="registerSelected">
        <Register />
      </div>
      <div v-else>
        <Login />
      </div>
      <br>
      <b-link v-on:click="toggleLogin" variant="primary">{{switchButtonText}}</b-link>
    </b-card>
  </div>
</template>

<script>
import Login from "./Login.vue";
import Register from "./Register.vue";
export default {
  name: "LoginPanel",
  components: {
    Login,
    Register
  },
  data() {
    return {
      registerSelected: false,
      loginAlert: ""
    };
  },
  methods: {
    toggleLogin: function() {
      this.loginAlert = ""
      this.registerSelected = !this.registerSelected;
    }
  },
  computed: {
    cardTitle: function() {
      return this.registerSelected ? "Register" : "Login"
    },
    switchButtonText: function() {
      return this.registerSelected ? "Login" : "Register"
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