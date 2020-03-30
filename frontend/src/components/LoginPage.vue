<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary" fixed="top">
      <b-navbar-brand to="/" class="pl-4">
        <img src="../assets/logotitle.svg" margin-left="10" alt="bb" width="300" />
      </b-navbar-brand>
      <b-navbar-nav class="ml-auto pr-4">
        <Login @setLoginError="setLoginError" />
      </b-navbar-nav>
    </b-navbar>
    <div class="container-fluid">
      <div v-if="loginAlert">
        <b-alert show variant="danger">{{loginAlert}}</b-alert>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="card" style="margin = 20px">
            <div class="card-body">
              <h5 class="card-title">Learn More about ProfessOrNot</h5>
              <p class="card-text">Learn more about our team and our misson here.</p>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title">Register</h2>
              <Register />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "./Login.vue";
import Register from "./Register.vue";
export default {
  name: "LoginPage",
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
      this.loginAlert = "";
      this.registerSelected = !this.registerSelected;
    },
    setLoginError(err) {
      this.loginAlert = err;
    }
  },
  computed: {
    cardTitle: function() {
      return this.registerSelected ? "Register" : "Login";
    },
    switchButtonText: function() {
      return this.registerSelected ? "Login" : "Register";
    }
  }
};
</script>

<style scoped>
.container-fluid {
  margin-top: 5%;
}
</style>