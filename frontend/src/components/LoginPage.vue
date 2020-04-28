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

    <div style="margin:.4rem" class="pt-3">
      <div v-if="loginAlert">
        <b-alert show variant="danger">{{loginAlert}}</b-alert>
      </div>
      <div class="container-fluid pt-2">
        <!-- First Row -->
        <div class="row">
          <div class="col-sm-6">
            <h2>Find your perfect schedule, guaranteed.</h2>
            <h3>It's super simple.</h3>
            <ul style="list-style-type:none text-align:left;" class="h4 pt-3">
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
            <b-card title="Sign Up!" style>
              <div style="max-width: 80%;" class="justify-content-center align-items-center container">
              <Register />
              </div>
            </b-card>
          </div>
        </div>
<hr class="my-4" />
        <div class="row mt-4">
          <h2>See How It Works</h2>
        </div>
        

        <!-- Third Row -->
        <div class="row">
          <b-card-group deck class="mx-5">
            <b-card
              title="Take the Quiz"
              img-src="../assets/QuizScreenshot.png"
              img-alt="Image"
              img-top
              tag="article"
              class="mb-2"
              style="max-width:500px;"
            >
              <b-card-text>Our learning style quiz discovers the way you learn, and your preferences in a class.</b-card-text>
            </b-card>
            <b-card
              title="Seach for Classes"
              img-src="../assets/SearchScreenshot.png"
              img-alt="Image"
              img-top
              tag="article"
              class="mb-2"
              style="max-width:500px;"
            >
              <b-card-text>Find reviews of courses and professors at your school from those who know best: your peers.</b-card-text>
            </b-card>
            <b-card
              title="Get Insight"
              img-src="../assets/ReviewScreenshot.png"
              img-alt="Image"
              img-top
              tag="article"
              class="mb-2"
              style="max-width:500px;"
            >
              <b-card-text>View ratings and comments from students who have taken the class and how similar they are to you.</b-card-text>
            </b-card>
          </b-card-group>
        </div>

        <hr class="my-4" />
        
        <!-- Second Row -->
        <div class="row">
          <div class="col-sm-6">
            <img src="../assets/teacher.svg" width="60%" height="auto" />
          </div>
          <div class="col-sm-6">
            <b-embed
            type="iframe"
            aspect="16by9"
            src="https://player.vimeo.com/video/410807511"
            allowfullscreen
            />
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
