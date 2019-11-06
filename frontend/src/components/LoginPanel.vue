<template>
  <div class="login-card">
    <b-card
      :title="cardTitle"
      img-src="../assets/logotitle.png"
      img-alt="Image"
      img-topb
      style="max-width: 20rem;"
      class="mb-2"
    >
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
      registerSelected: false
    };
  },
  methods: {
    toggleLogin: function() {
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