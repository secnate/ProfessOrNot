<template>
  <div>
    <Navbar />
    <!-- Popovers to display -->
    <CreateReview :propProfessor="professor" @add-new-review="addNewReview" />
    <div v-if="loadSuccess">
      <h1 class="professorTitle">
        <b>{{ this.professor != null ? this.professor.name : ""}}</b>
      </h1>

      <!-- If the professor doesn't have any reviews, then we just display a default message -->
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
              <b-button pill variant="info" size="lg" align="right" v-b-modal.review-modal>
                <b>Add Review</b>
              </b-button>
            </b-col>
          </b-row>

          <b-row>
            <HR width="100%" color="black" size="4" />
          </b-row>

          <div>
            <h2 align="left">Reviews:</h2>
            <Review
              v-for="review in this.professorReviews"
              :key="review.id"
              :review="review"
              hideProfessorName
            />
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
      profId: -1
    };
  },
  methods: {
    resetData() {
      this.status = "";
      this.professor = null;
      this.professorCourses = [];
      this.professorReviews = [];
      this.profId = -1;
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
      this.professorReviews.unshift(review)
      this.professor.avg_rating = review.professor.avg_rating
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

.review_course_name {
  font-size: 17pt;
  background-color: lightblue;
  text-align: left;
}
</style>