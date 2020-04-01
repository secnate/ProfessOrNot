<template>


  <div class="card" :key="review.id+0" v-if="!is_deleted">
    <div class="card-text" :key="review.id+1">
      <div class="card-text" :key="review.id+2">
        <div class="card-header">

          <b-container>
            <b-row>

              <b-col cols="1">
              </b-col>

              <b-col sm="7">
                <p class="review_prof_name" v-if="!hideProfessorName">
                  <b>Professor:</b>

                  <router-link :to="{name: 'professor', params: {id : review.professor.id }}">
                    <b>{{ review.professor.name }}</b>
                  </router-link>
                </p>
                <p class="review_course_name" v-if="!hideCourseName">
                  <b>Course: </b>

                  <router-link :to="{name: 'course', params: {id : review.course.id }}">
                    <b>{{ review.course.name }}</b>
                  </router-link>
                </p>

                <h2 class="rating_string" v-if="!is_editing_review">Ranking: {{review.rating }} / 5</h2>
                <h2 class="rating_string" v-if="is_editing_review">
                  Ranking:
                <StarRating v-model="rating_edit" v-bind:star-size="30" />
                </h2>

              </b-col>

              <b-col sm="3">

                <!-- If this is a review made by me, I display buttons for CRUD operations -->
                <b-button-toolbar v-if="this.review.my_review">

                  <b-button-group class="mx-1">

                    <!-- Buttons for performing CRUD operations on user-created reviews -->
                    <b-button
                      size="lg"
                      variant="outline-primary"
                      class="mb-2"
                      @click="this.edit_review"
                      v-if="!is_editing_review"
                    >
                      <b-icon icon="pencil-square">
                      </b-icon>
                    </b-button>

                    <b-button
                      size="lg"
                      variant="outline-primary"
                      class="mb-2"
                      @click="save_edit_changes"
                      v-if="is_editing_review"
                    >
                      <b-icon icon="file-check">
                      </b-icon>
                    </b-button>

                    <b-button
                      size="lg"
                      variant="outline-primary"
                      class="mb-2"
                      @click="this.cancel_review_edit"
                      v-if="is_editing_review"
                    >
                      <b-icon icon="x-circle-fill">
                      </b-icon>
                    </b-button>

                    <b-button
                      size="lg"
                      variant="outline-danger"
                      class="mb-2"
                      v-if="!is_editing_review"
                      @click="delete_review"
                    >
                      <b-icon icon="trash">
                      </b-icon>
                    </b-button>

                  </b-button-group>
                
                </b-button-toolbar>

                <!-- If this is a review not made by us, we show the similarity percentage -->
                <div v-else class="similarity_div">
                  <h2>
                    Similarity
                    
                    <!-- We show information about what this means -->
                    <b-icon v-b-tooltip.hover 
                      title="The Similarity score shows the degree to which the reviewer matches your preferences" 
                      icon="info-circle"
                      style="width: 20px; height: 20px;"
                      shift-v="4"
                      variant="primary"/>
                  </h2>
                  <h2>
                    {{review.similarity_score}}%
                  </h2>
                </div>
              </b-col>

              <b-col cols="1">
              </b-col>

            </b-row>
          </b-container>

        </div>

        <footer class="footer">
          <!-- Display any comments -->

          <b-container>
            <b-row>

                <b-col cols="1">
                </b-col>

                <b-col cols="8">
                  <div v-if="!is_editing_review">
                    <p class="review_comment" v-if="review.comment.length != 0 ">
                      <b>Student Comments:</b>
                      <br />
                      {{review.comment }}
                    </p>
                    <p class="review_comment" v-else>
                      <b>Student Comments:</b>
                      <br />
                      <i>No Comments Were Submitted</i>
                    </p>
                  </div>
                  <div v-if="is_editing_review">
                    <b-form-textarea
                      id="comment_edit"
                      v-model="comment_edit"
                      placeholder="Enter Comments..."
                      rows="3"
                      max-rows="6"
                    />
                  </div>
                </b-col>

                <b-col> 
                  <div class="card-body" :key="review.id+3">
                    <h2 class="date_string">{{ convertDateStringToDateRepresentation(review.created) }}</h2>
                  </div>
                </b-col>

                <b-col cols="1">
                </b-col>

              </b-row>
            </b-container>
        </footer>
      </div>
    </div>

  </div>
</template>


<script>
import axios from "axios";                  // used to communicate with backend database
import StarRating from "vue-star-rating";

export default {
  name: "Review",
  methods: {
    convertDateStringToDateRepresentation(date_str) {
      var dateObj = new Date(date_str);
      return dateObj.toLocaleDateString("en-US");
    },
    delete_review() {
      console.log("DEBUG: we are in the REEVIEW component and we are deleting.");

      // we now delete the review
      var id_of_deleted_review = this.review.id;

      new Promise((resolve, reject) => {
        this.status = "loading"; // we can show a loading wheel while in this state
        axios({ url: "/reviews/" + this.review.id, method: "DELETE" })
          .then(resp => {
            this.is_deleted = true;
            this.status = "success";
      
            // we let the parent know that we deleted it by emitting event to parent component
            this.$emit("delete", id_of_deleted_review);
      
            resolve(resp);
          })
          .catch(err => {
            console.log(err); /* eslint-disable-line no-console */
            this.status = "error";
            reject(err);
          });
      });
      
    },
    edit_review() {
      // resetting data
      this.comment_edit = this.review.comment; // we set the edited comment text to what we already have
      this.rating_edit = this.review.rating; // we set the editable rating component's rating to current rating

      this.is_editing_review = true;
    },
    cancel_review_edit() {
      this.is_editing_review = false;
    },
    save_edit_changes() {
      new Promise((resolve, reject) => {
        this.status = "loading"; // We can show a loading wheel while in this state
        axios({
          url: "/reviews/" + this.review.id,
          data: { rating: this.rating_edit, comment: this.comment_edit },
          method: "PATCH"
        })
          .then(resp => {
            this.status = "success";

            // save our edits so that they could be displayed on the frontend in addition to already being stored in backend
            this.review.comment = this.comment_edit;
            this.review.rating = this.rating_edit;
            this.is_editing_review = false;
            resolve(resp);
          })
          .catch(err => {
            console.log(err);
            this.status = "error";
            reject(err);
          });
      });
    }
  },
  props: {
    hideProfessorName: Boolean,
    hideCourseName: Boolean,
    review: Object
  },
  data() {
    return {
      is_deleted: false,
      is_editing_review: false,
      comment_edit: "",
      rating_edit: 0
    };
  },
  components: {
    StarRating
  }
};
</script>
<style scoped>

.card {
  margin-top: 15px;
}

.professorTitle {
  font-size: 40pt;
}

.professorInfoBody {
  background-color: none;
}

.review_box {
  align: center;
  width: 75%;
  border-color: 2px primary solid;
}

.review_comment {
  font-size: 15pt;
  width: 100%;
  background-color: none;
  text-align: left;
  margin-left: 10px;
  margin-top: 5px;
}

.date_string {
  font-size: 12pt;
  margin-left: 3px;
  text-align: right;
}

.makeNewReview {
  color: blue;
  font-style: underline;
}

.review_course_name {
  font-size: 20pt;
  background-color: light;
  text-align: left;
}

.review_prof_name {
  font-size: 20pt;
  background-color: light;
  text-align: left;
}

.rating_string {
  text-align: left;
  font-size: 18pt;
}

.similarity_div {
  background-color: #ffff80;
  border-radius: 10px;
}

</style>