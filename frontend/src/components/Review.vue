<template>
    <div class="card" :key="review.id+0" v-if="!is_deleted"> 
                  <div class="card-text" :key="review.id+1">
                    <div class="card-text" :key="review.id+2">
					<div class="card-header">
					  <p class="review_prof_name" v-if="!hideProfessorName"> <b>Professor: </b>
					
                        <router-link :to="{name: 'professor', params: {id : review.professor.id }}">
                          <b>{{ review.professor.name }}</b>
                        </router-link>
                      </p>
                      <p class="review_course_name" v-if="!hideCourseName"> <b>Course: </b> 
					  
                        <router-link :to="{name: 'course', params: {id : review.course.id }}">
                          <b>{{ review.course.name }}</b>
                        </router-link>
                      </p>

              <!-- Button will need to be repositioned and reformatted -->
              <b-button size="lg" variant="primary" class="mb-2" @click="this.edit_review" v-if="!is_editing_review">
                Edit
              </b-button>
              <b-button size="lg" variant="primary" class="mb-2" @click="this.cancel_review_edit" v-if="is_editing_review">
                Cancel Edit
              </b-button>
              <b-button size="lg" variant="primary" class="mb-2" @click="save_edit_changes" v-if="is_editing_review">
                Save Changes
              </b-button>

              <b-button size="lg" variant="danger" class="mb-2" @click="delete_review">
                Delete
              </b-button>

					    <h2 class="rating_string" v-if="!is_editing_review"> Ranking: {{review.rating }} / 5 </h2>
              <h2 class="rating_string" v-if="is_editing_review"> Ranking: <StarRating v-model="rating_edit" v-bind:star-size="30" /> </h2>
					  </div>
					  
					  
						<footer class="footer">
                      <!-- Display any comments -->
                      <div v-if="!is_editing_review">
                        <p class="review_comment" v-if="review.comment.length != 0 "> <b>Student Comments:</b> <br/> {{review.comment }} </p>
                        <p class="review_comment" v-else> <b>Student Comments:</b> <br/> <i>No Comments Were Submitted</i> </p>
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
            
            
            <div class="card-body" :key="review.id+3">
                        <h2 class="date_string"> {{ convertDateStringToDateRepresentation(review.created) }}</h2>
						</div>
					  </footer>
                    </div>
                  </div>
                </div>
</template>


<script>
import axios from "axios";  // used to communicate with backend database
import StarRating from "vue-star-rating";

export default {
    name: "Review",
    methods: {
      convertDateStringToDateRepresentation(date_str) {
        var dateObj = new Date(date_str)
        return dateObj.toLocaleDateString("en-US")
      },
      delete_review() {
        // deletes the review from the backend and saves change in backend
        console.log("DEBUG: DELETING REVIEW");
        console.log("DEBUG: this.review.id is: " + JSON.stringify(this.review.id));

        new Promise((resolve, reject) => {
        this.status = "loading"; // we can show a loading wheel while in this state
        axios({ url: "/reviews/" + this.review.id, method: "DELETE" })
          .then(resp => {
            this.is_deleted = true;
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
      edit_review() {
        console.log("DEBUG: setting groundwork for editing review");

        // resetting data
        this.comment_edit = this.review.comment;  // we set the edited comment text to what we already have
        this.rating_edit = this.review.rating;    // we set the editable rating component's rating to current rating 

        this.is_editing_review = true;
      },
      cancel_review_edit() {
        console.log("DEBUG: canceling review edit");
        this.is_editing_review = false;
      },
      save_edit_changes() {
        console.log("DEBUG: saving edit changes");
        

        new Promise((resolve, reject) => {
        this.status = "loading"; // We can show a loading wheel while in this state
        axios({ url: "/reviews/" + this.review.id, data: {rating: this.rating_edit, comment: this.comment_edit}, method: "PATCH" })
          .then(resp => {
            this.status = "success";

            // save our edits so that they could be displayed on the frontend in addition to already being stored in backend
            this.review.comment = this.comment_edit;
            this.review.rating = this.rating_edit
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
      }
    },
    components: {
      StarRating
    }
    
}
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
  margin-top:5px;
}

.date_string {
  font-size: 12pt;
  margin-left: 3px;
  text-align: right;
}

.rating_string {
  font-size: 18pt;
  text-align: left;
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
</style>