<template>
    <div>
        <Navbar/>
          <h1 class="professorTitle"> 
            <b> {{ this.professor != null ? this.professor.name : ""}} </b>
          </h1>

        <!-- If the professor didn't teach any classes, then we just display a default message -->
        <div v-if="this.professorCourses.length == 0">
          <h1>
            No Reviews Have Been Created.
          </h1>
          <h1>
            Would You Like To <div v-on:click="displayReviewModal" class="makeNewReview">Make One?</div>
          </h1>
        </div>

        <!-- If the professor taught some classes, then we know we have data to display, like reviews -->
        <b-container class="professorInfoBody" v-if="this.professorCourses.length != 0">
          <b-row>
            <b-col cols="8">
              <h2 align="left">Average Rating: {{this.professor.avg_rating}}</h2>
            </b-col>
            <b-col cols="4">
              <b-button pill variant="info" size="lg" align="right" v-b-modal.review-modal>
                <b> Add Review </b>
              </b-button>
            </b-col>
          </b-row>

          <b-row>
            <HR WIDTH="100%" COLOR="black" SIZE="4"/>
          </b-row>
            
          <div v-show="this.professorReviews.length != 0">
            <h2 align="left"> Reviews: </h2>
            <template v-for="review in this.professorReviews">
                
                <b-container :key="review.id+0" class="review_box"> 
                  <b-row :key="review.id+1">
                    <b-col cols="8" class="review_left_col" :key="review.id+2"> 
                      <p class="review_comment"> {{review.comment }} </p>
                    </b-col>

                    <b-col cols="4" class="review_right_col" :key="review.id+3">
                      <b-row>
                        <h2 class="rating_string"> Ranking: {{review.rating }} / 5 </h2>
                      </b-row>

                      <b-row>
                        <h2 class="date_string"> On {{ convertDateStringToDateRepresentation(review.created) }}</h2>
                      </b-row>
                    </b-col>
                  </b-row>
                </b-container>

            </template>
          </div> 

        </b-container>

        <!-- Popovers to display -->
        <Review :professorIDProp="profId" :professorNameProp="professorName"
                :courseIDProp="0" courseNameProp=""/> 

    </div>

</template>

<script>

import Navbar from "./Navbar.vue"
import Review from "./Review.vue"
import axios from "axios"; // used to communicate with backend database

export default {
  name: "ProfessorPage",
  components: {
    Navbar, Review
  },
  data() {
    return {
      professor: null,
      professorName: "",
      professorCourses: [],
      professorReviews: [],
      profId: -1
    }
  },
  methods: {
    resetData() {
      this.professor = null
      this.professorCourses = []
      this.professorReviews = []
      this.profId = -1
    },
    getRatingString(value) {
      return "Rating: " + JSON.stringify(value)
    },
    convertDateStringToDateRepresentation(date_str) {
      var dateObj = new Date(date_str)

      return dateObj.toLocaleDateString("en-US")
    },
    displayReviewModal() {
      // is invoked when I need to click a link to pull it up instead of a button
      this.$bvModal.show('review-modal')
    }
  },
  computed: {
    hasReviews : function() {
      return this.professorCourses.length > 0
    }
  },
  mounted() {
    console.log("DEBUG: in professor page. before mounting!") /* eslint-disable-line no-console */
    console.log("DEBUG: passed in profId is: " + this.$route.query.profId) /* eslint-disable-line no-console */

    // query the backend for the data. If It is "not found," act appropriately
    // otherwise, display it
    console.log("DEBUG: querying backend") /* eslint-disable-line no-console */

    this.profId = Number(this.$route.query.profId)

    console.log("DEBUG: typeof profId is: " + typeof this.profId) /* eslint-disable-line no-console */

    new Promise( (resolve, reject) => {
      this.status = 'loading' // we can show a loading wheel while in this state 

      axios({ url: "/professors/" + this.profId, method: "GET" })
          .then( resp => {
              console.log(resp) /* eslint-disable-line no-console */

              if (resp.detail === "Not found.") {
                // we searched for an invalid professor
                this.resetData()

                console.log("DEBUG: searched for an invalid professor. values are all default.") /* eslint-disable-line no-console */
              }
              else {
                // we got a legitimate professor. extract the data, and save it
                this.haveProfToShow = true;
                this.professor = resp.data.professor;
                this.professorName = this.professor.name
                this.profId = this.professor.id
                console.log("DEBUG: the professor is is: " + this.profId + " and the type is: " + typeof this.profId) /* eslint-disable-line no-console */
                this.professorCourses = resp.data.courses;
                this.professorReviews = resp.data.reviews;

                console.log("DEBUG: searched for a valid professor.") /* eslint-disable-line no-console */
                console.log("\tThe professor is: " + JSON.stringify(this.professor)) /* eslint-disable-line no-console */
                console.log("\tThe professor courses are: " + JSON.stringify(this.professorCourses)) /* eslint-disable-line no-console */
                console.log("\tThe professor review are: " + JSON.stringify(this.professorReviews)) /* eslint-disable-line no-console */
                console.log("\tDEBUG: length of prof course array is: " + JSON.stringify(this.professorCourses.length))  /* eslint-disable-line no-console */
              }


                                

              this.status = 'success'

              resolve(resp)
          })
          .catch( err => {
            console.log(err); /* eslint-disable-line no-console */
            this.status = 'error'

            reject(err)
        });
    });

  }
};
</script>


<style>
.professorTitle {
  font-size: 40pt;
}

.professorInfoBody {
  background-color: none;
}

.review_box {
  border: 1px black solid;
}

.review_left_col {
  font-style: bold;
  background-color: lightblue;
}

.review_right_col {
  font-style: bold;
  background-color: lightblue;
  border-left: black 2px solid;
}

.review_comment {
  font-size: 15pt;
  width: 100%;
  background-color: none;
}

.date_string {
  font-size: 15pt;
  text-align: center;
  margin-left: 3px;
}

.rating_string {
  font-size: 18pt;
  text-align: center;
  margin-left: 3px;
  margin-top: 3px;
}

.makeNewReview {
  color: blue;
  font-style: underline;
}

</style>