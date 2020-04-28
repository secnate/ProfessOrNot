
<template>
  <div>
    <NavBar/>
    <br/> 

    <div v-if="this.loading">
      <h1> Loading All Courses </h1>
      <b-spinner variant="primary" label="Spinning"/>
    </div>
    <div v-else class="reviews"> 
      <h1> All Courses </h1>
      <div v-if="all_reviews.length == 0">
        <div class="mt-5">
        <b-img src="../assets/empty_box.svg" class="mt-50" width="300" />
        </div>
                <div class="mt-5 h2">
        No Courses Have Been Entered. How sad &#128532;
        </div>
      </div>

      
      <CourseProfSummary
              v-for="review in this.all_reviews"
              :key="review.id"
              :review="review"
              :hideProfessorName="true"
            />
    </div>

  </div>
</template>

<script>
import NavBar from "./Navbar.vue";
import CourseProfSummary from "./CourseProfSummary.vue";
import axios from "axios"; // used to communicate with backend database

export default {
  name: "AllCourses",
  components: {
    NavBar, CourseProfSummary
  },
  mounted: function() {
    this.retrieveData();
  },
  computed: {
  },
  data() {
    return {
      all_reviews: [],
      loading: ""
    };
  },
  methods: {
    retrieveData() {
      // retrieves all the reviews from the backend
      new Promise((resolve, reject) => {
        this.loading = true; // we can show a loading wheel while in this state

        axios({ url: "/courses", method: "GET" })
          .then(resp => {

            this.all_reviews = resp.data;
            this.loading = false;
            resolve(resp);
          })
          .catch(err => {

            reject(err);
          });
      });
    }
  }
};
</script>


<style scoped>
.reviews {
  width: 65%;
  margin: 0 auto;
}
</style>