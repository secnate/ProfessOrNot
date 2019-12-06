<template>
    <div>
        <Navbar/>
		<div>
  <b-jumbotron>
    <template v-slot:header><b-img src="..\assets\logotitle_2.svg" width="600%" height= auto alt="Fluid-grow image"></b-img></template>

    <template v-slot:lead>
      Your professors. Your choice.
    </template>
<Search />
    <hr class="my-4">

    <p>
      Take our quiz to find your perfect professor here:
    </p>

    <b-button href="#" disabled size="lg" variant="primary">To the quiz >></b-button>
  </b-jumbotron>
</div>
        
		<div class="container-fluid">
		<div class="row">
  <div class="col-sm-6">
    <div class="card" style="margin = 20px">
      <div class="card-body">
        <h5 class="card-title">Learn More about ProfessOrNot</h5>
        <p class="card-text">Learn more about our team and our misson here.</p>
        <b-button href="#" disabled size="lg" variant="primary">Our about page >></b-button>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Need More help?</h5>
        <p class="card-text">Contact us if you need more help with our website.</p>
        <b-button href="#" disabled size="lg" variant="primary">Contact Us >></b-button>
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
 margin-top: 5%;
}
</style>
