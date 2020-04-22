<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary" fixed="top" ref="nav_bar">
      <b-navbar-brand to="/" class="pl-4">
        <img src="../assets/logotitle.svg" margin-left="10" alt="bb" width="300" />
      </b-navbar-brand>
      <b-navbar-nav class="ml-auto pr-4">
        <Login @setLoginError="setLoginError" />
      </b-navbar-nav>
    </b-navbar>

    <!-- Adding in vertical offset so if the width of the website is adjusted -->
    <!-- that the navbar doesn't bleed over into the next element -->
    <br />

    <div style="margin:.4rem">
      <div v-if="loginAlert">
        <b-alert show variant="danger">{{loginAlert}}</b-alert>
      </div>
      <div v-else>
        <br />
        <br />
      </div>
      <div class="container-fluid">

        <!-- First Row -->
        <div class="row">
          <div class="col-sm-6">
            <h2>Find your perfect schedule, guaranteed.</h2>
            <h3>It's super simple.</h3>
            <ul style="list-style-type:none text-align:left;" class="h4">
              <li>
                <span>
                  <b-icon-check-box />
                </span> Take a simple learning style quiz to generate your profile.
              </li>
              <li>
                <span>
                  <b-icon-file-earmark-break />
                </span> Our system scans your responses and compares it to those of other students.
              </li>
              <li>
                <span>
                  <b-icon-book />
                </span> View your results and make an informed decision during registration.
              </li>
            </ul>
          </div>
          <div class="col-sm-6">
            <img src="../assets/teacher.svg" width="60%" height="auto" />
          </div>
        </div>

        <!-- Second Row -->
        <div class="row">
          <div class="col-sm-6">
            <img src="../assets/university.svg" width="60%" height="auto" />
          </div>
          <div class="col-sm-6">
            <b-card title="Join Us!" style>
              <Register />
            </b-card>
          </div>
        </div>

        <!-- Third Row -->
        <div class="row mt-4">
          <div class="col-sm-6">
            <h5>Learn More about ProfessOrNot</h5>
            <p class="card-text">Learn More About Our Team and Our Misson Here.</p>
            <router-link to="/about">
              <b-button size="lg" variant="primary">Our About Page</b-button>
            </router-link>
          </div>
          <div class="col-sm-6">
            <h5>Need More help?</h5>
            <p class="card-text">Contact Us If You Need More Help With Our Website.</p>
            <router-link to="/contact">
              <b-button size="lg" variant="primary">Contact Us</b-button>
            </router-link>
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
  mounted() {
    this.mounted_yet = true;
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
.row {
  width: 100%;
  padding: 10px;
     display: flex;
    align-items: center;
    justify-content: center;
}
ul {
  list-style-type: none;
  margin-left: 2.5em;
  padding-left: 0;
  text-align: left;
  padding-left: 1em;
}
ul > li {
  position: relative;
}
span {
  left: -2em;
  position: absolute;
  text-align: center;
  width: 2em;
  line-height: inherit;
}
li {
  padding: 0.6em;
}
</style>
