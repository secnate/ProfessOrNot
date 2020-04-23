<template>
  <div>
    <Navbar />
    <div>
      <b-jumbotron>
        <template v-slot:header>
          <b-img src="../assets/logotitle_2.svg" width="600%" height="auto" alt="Fluid-grow image"></b-img>
        </template>

        <template v-slot:lead>Your professors. Your choice.</template>
        <Search />
        <hr class="my-4" />
        <b-button href="#" size="lg" variant="primary" class="button" to="allprofessors">View All Professors >></b-button>
        <b-button href="#" size="lg" variant="primary" class="button" to="allcourses">View All Courses >></b-button>
      </b-jumbotron>
    </div>

    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6">
          <div class="card" style="margin = 20px">
            <div class="card-body">
              <h5 class="card-title">Learn More about ProfessOrNot</h5>
              <p class="card-text">Learn More About Our Team and Our Misson Here.</p>
              <router-link to="/about">
                <b-button size="lg" variant="primary">Our About Page</b-button>
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Need More help?</h5>
              <p class="card-text">Contact Us If You Need More Help With Our Website.</p>
              <router-link to="/contact">
                <b-button size="lg" variant="primary">
                  Contact Us 
                </b-button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import Search from "./Search.vue";
import router from "../router.js";

export default {
  name: "Main",
  components: {
    Navbar,
    Search
  },
  data() {
    return {};
  },
  methods: {},
  computed: {}
};
</script>

<style scoped>
.titleImage {
  margin: 0 auto;
  width: 80%;
}
.container-fluid {
  margin-top: 20px;
}
.button{
  margin-right:20px;
}
</style>
