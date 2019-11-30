<template>
    <div>
        <Navbar/>
        <h1 class="courseTitle"> 
            <b> {{ this.course != null ? this.course.name : ""}} </b>
        </h1>

        <!-- If the professor didn't teach any classes, then we just display a default message -->
        <div v-if="this.courseProfessors.length == 0 && this.loadedData">
          <h1>
            No Reviews Have Been Created.
          </h1>
          <h1>
            Would You Like To <div v-on:click="displayReviewModal" class="makeNewReview">Make One?</div>
          </h1>
        </div>

        <!-- If the course has been taught by a professor, then we know we have data to display, like reviews -->
        <b-container class="courseInfoBody" v-if="this.courseProfessors.length != 0">
          <b-row>
            <b-col cols="8">
              <h2 align="left">Average Rating: {{this.course.avg_rating}} / 5</h2>
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
            
          <div v-show="this.courseReviews.length != 0">
            <h2 align="left"> Reviews: </h2>
            <template v-for="review in this.courseReviews">
                
                <b-container :key="review.id+0" class="review_box"> 
                  <b-row :key="review.id+1">

                    <b-col cols="8" class="review_left_col" :key="review.id+2"> 

                      <p class="review_prof_name"> <b>Professor: </b> 
                        <router-link :to="{name: 'professor', query: {profId : review.professor.id }}">
                          <b>{{ review.professor.name }}</b>
                        </router-link>
                      </p>

                      <!-- Display any comments -->
                      <p class="review_comment" v-if="review.comment.length != 0 "> <b>Student Comments:</b> <br/> {{review.comment }} </p>
                      <p class="review_comment" v-else> <b>Student Comments:</b> <br/> <i>No Comments Were Submitted</i> </p>

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
        <Review :professorIDProp="0" professorNameProp="" :courseIDProp="courseId" :courseNameProp="courseName"/> 
    </div>
</template>

<script>
import Navbar from "./Navbar.vue"
import Review from "./Review.vue"
import axios from "axios"; // used to communicate with backend database

export default {
  name: "CoursePage",
  components: {
    Navbar, Review
  },
  data() {
    return {
      course: null,
      courseName: "",
      courseProfessors: [],
      courseReviews: [],
      courseId: -1,
      loadedData: false
    }
  },
  methods: {
    resetData() {
      this.course = null
      this.courseName = ""
      this.courseProfessors = []
      this.courseReviews = []
      this.courseId = -1
      this.loadedData = false
    },
    convertDateStringToDateRepresentation(date_str) {
      var dateObj = new Date(date_str)

      return dateObj.toLocaleDateString("en-US")
    },
    getRatingString(value) {
      return "Rating: " + JSON.stringify(value)
    },
    displayReviewModal() {
      // is invoked when I need to click a link to pull it up instead of a button
      this.$bvModal.show('review-modal')
    }
  },
  computed: {
    hasProfessors : function() {
      return this.courseProfessors.length > 0
    }
  },
  mounted() {
      console.log("DEBUG: in coursepage page before mounting!") /* eslint-disable-line no-console */

      this.courseId = Number(this.$route.query.courseId)
      console.log("DEBUG: passed in courseId is: " + this.courseId) /* eslint-disable-line no-console */

      new Promise( (resolve, reject) => {
      this.status = 'loading' // we can show a loading wheel while in this state 

      axios({ url: "/courses/" + this.courseId, method: "GET" })
          .then( resp => {
              console.log(resp) /* eslint-disable-line no-console */
                         
              this.course = resp.data.course
              this.courseName = this.course.name
              this.courseId = this.course.id
              this.courseProfessors = resp.data.professors
              this.courseReviews = resp.data.reviews
              this.loadedData = true

              console.log("DEBUG: the courseReviews is: " + JSON.stringify(this.courseReviews)) /* eslint-disable-line no-console */
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
.courseTitle {
  font-size: 40pt;
}

.courseInfoBody {
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
  text-align: left;
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

.review_prof_name {
  font-size: 17pt;
  background-color: lightblue;
  text-align: left;
}

</style>