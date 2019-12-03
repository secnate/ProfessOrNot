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
            <Review v-for="review in this.courseReviews" :key="review.id" :review="review" hideCourseName />
          </div> 

        </b-container>

        <!-- Popovers to display -->
        <CreateReview :propCourse="course" @add-new-review="addNewReview"/>
    </div>
</template>

<script>
import Navbar from "./Navbar.vue"
import CreateReview from "./CreateReview.vue"
import Review from "./Review.vue"
import axios from "axios"; // used to communicate with backend database

export default {
  name: "CoursePage",
  components: {
    Navbar, CreateReview, Review
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
    },
    addNewReview(review) {
      this.courseReviews.unshift(review)
    }
  },
  computed: {
    hasProfessors : function() {
      return this.courseProfessors.length > 0
    }
  },
  mounted() {

      this.courseId = Number(this.$route.params.id)

      new Promise( (resolve, reject) => {
      this.status = 'loading' // we can show a loading wheel while in this state 

      axios({ url: "/courses/" + this.courseId, method: "GET" })
          .then( resp => {
                         
              this.course = resp.data.course
              this.courseName = this.course.name
              this.courseId = this.course.id
              this.courseProfessors = resp.data.professors
              this.courseReviews = resp.data.reviews
              this.loadedData = true

              this.status = 'success'

              resolve(resp)
          })
          .catch( err => {
            this.status = 'error'

            reject(err)
        });
    });
  }
};
</script>

<style scoped>
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