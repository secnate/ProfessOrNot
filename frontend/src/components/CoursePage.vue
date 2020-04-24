<template>
  <div>
    <Navbar />
    <!-- Popovers to display -->
    <CreateReview :propCourse="course" @add-new-review="addNewReview" />
    <!-- Loading -->
    <div v-if="status ==='loading'">
      <br />
      <b-spinner variant="primary" label="Spinning" />
    </div>
    <!-- If loaded successfully -->
    <div v-if="loadSuccess">
      <div class="jumbotron jumbotron-fluid">
        <div class="container">
          <h1 class="courseTitle">
            <b>{{ this.course != null ? this.course.name : ""}}</b>
          </h1>
        </div>
      </div>
      <!-- If the course doesn't have any reviews, then we just display a default message -->
      <div v-if="!this.hasReviews">
        <h1>No Reviews Have Been Created.</h1>
        <h1>
          Would You Like To
          <div v-on:click="displayReviewModal" class="makeNewReview">Make One?</div>
        </h1>
      </div>

      <!-- If there are reviews -->
      <div v-if="this.hasReviews">
        <b-container class="courseInfoBody">
          <b-row>
            <b-col cols="8">
              <h2 align="left">Average Rating: {{this.course.avg_rating}} / 5</h2>
            </b-col>
            <b-col cols="4">
              <b-button pill variant="primary" size="lg" align="right" v-b-modal.review-modal>
                <b>Add Review</b>
              </b-button>
            </b-col>
          </b-row>

          <div>
            <h2 align="left">Reviews:</h2>

            <b-input-group size="sm">

              <b-form-input 
                placeholder="Search By Course Name..."
                v-model="search_text"
              > 
              </b-form-input >

            </b-input-group>

            <div 
              v-for="review in this.courseReviews"
              :key="review.id + 10"
            >
              <div v-if="searchTextMeetsReviewName(review.professor.name)">
                <Review
                  :key="review.id"
                  :review="review"
                  v-on:delete="deleteReview"
                  hideCourseName
                />
              </div>
            </div>

          </div>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import CreateReview from "./CreateReview.vue";
import Review from "./Review.vue";
import axios from "axios"; // used to communicate with backend database

export default {
  name: "CoursePage",
  components: {
    Navbar,
    CreateReview,
    Review
  },
  data() {
    return {
      status: "",
      course: null,
      courseName: "",
      courseProfessors: [],
      courseReviews: [],
      courseId: -1,
      search_text: ""
    };
  },
  methods: {
    resetData() {
      this.status = "";
      this.course = null;
      this.courseName = "";
      this.courseProfessors = [];
      this.courseReviews = [];
      this.courseId = -1;
      this.search_text = "";
    },
    convertDateStringToDateRepresentation(date_str) {
      var dateObj = new Date(date_str);

      return dateObj.toLocaleDateString("en-US");
    },
    getRatingString(value) {
      return "Rating: " + JSON.stringify(value);
    },
    displayReviewModal() {
      // is invoked when I need to click a link to pull it up instead of a button
      this.$bvModal.show("review-modal");
    },
    addNewReview(review) {
      this.courseReviews.unshift(review);
      this.course.avg_rating = review.course.avg_rating;
    },
    retrieveData() {
      new Promise((resolve, reject) => {
        this.status = "loading"; // we can show a loading wheel while in this state

        axios({ url: "/courses/" + this.courseId, method: "GET" })
          .then(resp => {
            this.course = resp.data.course;
            this.courseName = this.course.name;
            this.courseId = this.course.id;
            this.courseProfessors = resp.data.professors;
            this.courseReviews = resp.data.reviews;

            this.status = "success";

            resolve(resp);
          })
          .catch(err => {
            this.status = "error";

            reject(err);
          });
      });
    },
    deleteReview(id_to_delete) {
      // we recieve event from the child Review component and update our data accordingly
      var i = 0;
      for (i = 0; i < this.courseReviews.length; i++) {
        if (this.courseReviews[i].id == id_to_delete) {
          this.courseReviews.splice(i, 1); // remove one element at index i
        }
      }
    },
    searchTextMeetsReviewName(professorName)
    {

      if (this.search_text == "") {
        // if nothing has been entered as a search text, anything works!
        return true; 
      }

      // the goal is to determine if the text 
      // entered in the search bar matches the leading portion of a course name 

      if (this.search_text.length > professorName.length) {
        return false;   // we are going beyond the length of the course name and that is baaad
      }

      // we now check if the search text corresponds to the course name in earlier portions

      var lowercased_search_text = this.search_text.toLowerCase();
      var lowercased_course_name = professorName.toLowerCase();

      return lowercased_course_name.startsWith(lowercased_search_text);
    }
  },
  computed: {
    loadSuccess() {
      if (this.status === "success") {
        return true;
      }
      return false;
    },
    hasReviews: function() {
      return this.courseReviews.length > 0;
    }
  },
  mounted() {
    this.courseId = Number(this.$route.params.id);
    this.retrieveData();
  }
};
</script>

<style scoped>
.container {
  height: 50px;
  width: auto;
}

.courseTitle {
  font-size: 45pt;
  text-align: left;
}

.courseInfoBody {
  background-color: none;
}

.review_box {
  border: 1px black solid;
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
  margin-top: 3px;
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

.container-fluid {
  text-align: left;
  margin-bottom: 20px;
  margin-left: 10%;
}
</style>