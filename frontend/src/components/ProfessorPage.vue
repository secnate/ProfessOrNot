<template>
  <div>
    <Navbar />
    <!-- Popovers to display -->
    <CreateReview :propProfessor="professor" @add-new-review="addNewReview" />
    <!-- Loading -->
    <div v-if="status ==='loading'">
      <br />
      <b-spinner variant="primary" label="Spinning" />
    </div>
    <!-- If loaded successfully -->
    <div v-if="loadSuccess">
      <div class="jumbotron jumbotron-fluid">
        <div class="container">
          <h1 class="professorTitle">
            <b>{{ this.professor != null ? this.professor.name : ""}}</b>
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
        <b-container class="professorInfoBody">
          <b-row>
            <b-col cols="8">
              <h2 align="left">Average Rating: {{this.professor.avg_rating}} / 5</h2>
            </b-col>
            <b-col cols="4">
              <b-button pill variant="primary" size="lg" align="right" v-b-modal.review-modal>
                <b>Add Review</b>
              </b-button>
            </b-col>
          </b-row>

          <div>

            <h2 align="left">Reviews:</h2>

            <!-- searchbar to filter reviews & reviews themselves -->
            <b-input-group size="sm">

              <b-form-input 
                placeholder="Search By Course Name..."
                v-model="search_text"
              > 
              </b-form-input >

            </b-input-group>

            <div 
              v-for="review in this.professorReviews"
              :key="review.id"
            >
              <div v-if="searchTextMeetsReviewName(review.course.name)">
                <Review
                  :key="review.id"
                  :review="review"
                  v-on:delete="deleteReview"
                  hideProfessorName
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
  name: "ProfessorPage",
  components: {
    Navbar,
    CreateReview,
    Review
  },
  data() {
    return {
      status: "",
      professor: null,
      professorName: "",
      professorCourses: [],
      professorReviews: [],
      profId: -1,
      search_text: ""
    };
  },
  methods: {
    resetData() {
      this.status = "";
      this.professor = null;
      this.professorCourses = [];
      this.professorReviews = [];
      this.profId = -1;
      this.search_text="";
    },
    getRatingString(value) {
      return "Rating: " + JSON.stringify(value);
    },
    convertDateStringToDateRepresentation(date_str) {
      var dateObj = new Date(date_str);
      return dateObj.toLocaleDateString("en-US");
    },
    displayReviewModal() {
      // is invoked when I need to click a link to pull it up instead of a button
      this.$bvModal.show("review-modal");
    },
    addNewReview(review) {
      this.professorReviews.unshift(review);
      this.professor.avg_rating = review.professor.avg_rating;
    },
    retrieveData() {
      new Promise((resolve, reject) => {
        this.status = "loading"; // we can show a loading wheel while in this state
        axios({ url: "/professors/" + this.profId, method: "GET" })
          .then(resp => {
            this.professor = resp.data.professor;
            this.professorName = this.professor.name;
            this.profId = this.professor.id;
            this.professorCourses = resp.data.courses;
            this.professorReviews = resp.data.reviews;
            this.status = "success";
            resolve(resp);
          })
          .catch(err => {
            console.log(err); /* eslint-disable-line no-console */
            this.status = "error";
            reject(err);
          });
      });
    },
    deleteReview(id_to_delete) {
      // we recieve event from the child Review component and update our data accordingly
      var i = 0;
      for (i = 0; i < this.professorReviews.length; i++) {
        if (this.professorReviews[i].id == id_to_delete) {
          this.professorReviews.splice(i, 1); // remove one element at index i
        }
      }
    },
    searchTextMeetsReviewName(courseName)
    {

      if (this.search_text == "") {
        // if nothing has been entered as a search text, anything works!
        return true; 
      }

      // the goal is to determine if the text 
      // entered in the search bar matches the leading portion of a course name 

      if (this.search_text.length > courseName.length) {
        return false;   // we are going beyond the length of the course name and that is baaad
      }

      // we now check if the search text corresponds to the course name in earlier portions

      var lowercased_search_text = this.search_text.toLowerCase();
      var lowercased_course_name = courseName.toLowerCase();

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
      return this.professorReviews.length > 0;
    },
    professorCourseNames: function() {
      var toReturn = [];

      var i = 0;
      for (i = 0; i < this.professorCourses.length; i++) {
        toReturn.push( this.professorCourses[i].name );
      }
      return toReturn;
    }
  },
  mounted() {
    // query the backend for the data. If It is "not found," act appropriately
    // otherwise, display it
    this.profId = Number(this.$route.params.id);
    this.retrieveData();
  }
};
</script>


<style scoped>
.container {
  height: 50px;
  width: auto;
}

.professorTitle {
  font-size: 45pt;
  text-align: left;
}

.professorInfoBody {
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

.review_course_name {
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