<template>


  <div class="card" :key="review.id+0" v-if="!is_deleted">
    <div class="card-text" :key="review.id+1">
      <div class="card-text" :key="review.id+2">
        <div class="card-header">

          <b-container>
            <b-row>

              <b-col cols="1">
              </b-col>

              <b-col sm="">
                <p class="review_prof_name" v-if="!hideProfessorName">
                  <b>Professor: </b>

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

                <h2 class="rating_string" v-if="!is_editing_review">
                  Ranking: 
                  <StarRating v-model="this.review.rating" v-bind:star-size="30" v-bind:read-only="true"/>
                </h2>
                <h2 class="rating_string" v-if="is_editing_review">
                  Ranking:
                  <StarRating v-model="rating_edit" v-bind:star-size="30" />
                </h2>

              </b-col>

              <b-col sm="2">

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
                      @click="this.cancel_review_edit"
                      v-if="is_editing_review"
                    >
                      <b-icon icon="x-circle-fill">
                      </b-icon>
                    </b-button>

                    <b-button
                      size="lg"
                      variant="outline-success"
                      class="mb-2"
                      @click="save_edit_changes"
                      v-if="is_editing_review"
                    >
                      <b-icon icon="file-check">
                      </b-icon>
                    </b-button>

                    <b-button
                      size="lg"
                      variant="outline-danger"
                      class="mb-2"
                      v-if="!is_editing_review"
                      @click="$bvModal.show('delete-modal-' + review.id)"
                    >
                      <b-icon icon="trash">
                      </b-icon>
                    </b-button>

                  </b-button-group>
                
                </b-button-toolbar>

                <!-- If this is a review not made by us, we show the similarity percentage -->
                <div 
                  v-else-if="review.similarity_score != null" 
                  :style="similarity_style"
                >
                  <h2 class="similarity_text">
                    Similarity
                    
                    <!-- We show information about what this means -->
                    <b-icon v-b-tooltip.hover 
                      title="The Similarity score shows the degree to which the reviewer matches your preferences" 
                      icon="info-circle"
                      style="width: 20px; height: 20px;"
                      variant="primary"/>
                  </h2>
                  <h2>
                    {{Math.trunc(review.similarity_score)}}%
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

                <b-col cols="3"> 
                  <div class="card-body" :key="review.id+3">
                    <h2 class="date_string">{{ convertDateStringToDateRepresentation(review.created) }}</h2>
                  </div>
                </b-col>

              </b-row>
            </b-container>
        </footer>
      </div>
    </div>

    <!-- Modal to display to confirm if someone wants to delete -->
    <b-modal
      centered
      :id="'delete-modal-' + review.id"
    >

      <h1 class="confirmation_text"> 
        Are You Sure You Want To Delete? <br/> This Can Not Be Undone.
      </h1>

      <!-- Customized formatting of the footer -->
      <template v-slot:modal-footer="{ok, cancel}">
        <b-button size="lg" 
                  variant="outline-secondary" 
                  @click="$bvModal.hide('delete-modal-' + review.id)">
          No
        </b-button>
        <b-button size="lg" variant="danger" @click="clicked_ok()">
          Yes
        </b-button>
      </template>

    </b-modal>

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
    clicked_ok() {
      // we clicked the confirmation modal and now are going to 
      // perform the deletion and close the modal
      this.delete_review();
      this.$bvModal.hide('delete-modal-' + this.review.id);
    },
    delete_review() {
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
  computed: {
    similarity_style: function() {
      // This returns the style that corresponds to the similarity percentage
      if (this.review.similarity_score != null) {
        if (0 <= this.review.similarity_score && this.review.similarity_score <= 33) {
          return {
            'background-color': '#ff8080', // red
            'border-radius': '10px'
          };
        }
        else if (34 <= this.review.similarity_score && this.review.similarity_score <= 66) {
          return {
            'background-color': '#ffb366', // orange
            'border-radius': '10px'
          };
        } else {
          // 67% to 100%
          return {
            'background-color': '#70db70', // green
            'border-radius': '10px'
          };
        }
      } 
      else {
        return {
            'background-color': '#000000', // black
            'border-radius': '10px'
        };
      }
    }
  },
  data() {
    return {
      is_deleted: false,
      is_editing_review: false,
      comment_edit: "",
      rating_edit: 0,
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
  font-size: 14pt;
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

/* The following is for the portion that confirms the delection */ 

.confirmation_title {
  font-size: 25pt;
  text-align: left;
}

.confirmation_text {
  font-size: 20pt;
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
}

.similarity_text {
  font-size: 15pt;
  padding-top: 10px;
}


</style>