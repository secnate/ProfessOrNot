
<template>
  <div>
    <NavBar/>
    <br/> 

    <div v-if="this.loading">
      <h1> Loading Your Reviews </h1>
      <b-spinner variant="primary" label="Spinning"/>
    </div>
    <div v-else class="reviews"> 
      <h1> Your Reviews </h1>

      <Review
              v-for="review in this.all_reviews"
              :key="review.id"
              :review="review"
              v-on:delete="deleteReview"
            />
    </div>

  </div>
</template>

<script>
import NavBar from "./Navbar.vue";
import Review from "./Review.vue";
import axios from "axios"; // used to communicate with backend database

export default {
  name: "MyReviews",
  components: {
    NavBar, Review
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

        axios({ url: "/reviews/my", method: "GET" })
          .then(resp => {

            this.all_reviews = resp.data;
            this.loading = false;
            resolve(resp);
          })
          .catch(err => {

            reject(err);
          });
      });
    },
    deleteReview(id_to_delete) {
      // we recieve event from the child Review component and update our data accordingly
      var i = 0;
      for ( i = 0; i < this.all_reviews.length; i++) {
        if (this.all_reviews[i].id == id_to_delete) {
          this.all_reviews.splice(i, 1); // remove one element at index i
        }
      }
    }
  }
};
</script>


<style scoped>
.reviews {
  width: 50%;
  margin-left: 25%;
  margin-right: 25%;
}
</style>