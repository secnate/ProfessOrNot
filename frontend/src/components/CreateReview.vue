// This modal is shown as the second modal for registering a professor
<template>
  <div>
    <b-modal
      id="review-modal"
      title="Add Class Review"
      ok-title="Next"
      v-bind:hideFooter="true"
      @hide="closeModal"
      @show="show"
    >
      <b-alert v-for="error in errors" :key="error" show variant="danger">{{error}}</b-alert>
      <b-form @submit="submit">
        <label>Professor's Name</label>
        <v-select
          :options="professors"
          label="name"
          @input="setProfessor"
          :clearable="false"
          :disabled="professorDisabled"
          :value="profVal || propProfessor"
        >
          <template v-slot:no-options="{ search, searching }">
            <template v-if="searching">
              <div v-on:click="createProfessor(search)" class="vs__dropdown-option">
                Create New Professor:
                <em>{{ search }}</em>
                <b-icon icon="arrow-right" class="ml-1"></b-icon>
              </div>
            </template>
          </template>
        </v-select>

        <label>Course Name (Three or Four Uppercase Letters + Three Digits)</label>
        <v-select
          :options="courses"
          label="name"
          @input="setCourse"
          :clearable="false"
          :disabled="courseDisabled"
          :value="courseVal || propCourse"
        >
          <template v-slot:no-options="{ search, searching }">
            <template v-if="searching">
              <div v-on:click="createCourse(search)" class="vs__dropdown-option">
                Create New Course:
                <em>{{ search }}</em>
                <b-icon icon="arrow-right" class="ml-1"></b-icon>
              </div>
            </template>
          </template>
        </v-select>

        <b-form-group label="Ranking">
          <StarRating v-model="new_review.rating" v-bind:star-size="30" />
        </b-form-group>

        <br />

        <b-form-group label="Enter Comments">
          <b-form-textarea
            id="comment-textarea"
            v-model="new_review.comment"
            autocomplete="off"
            type="text"
            placeholder="Enter comments..."
          ></b-form-textarea>
        </b-form-group>

        <div class="submitButtonRow">
          <b-button class="submitButton" type="submit" variant="primary" pill>Finish</b-button>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import ModalPlugin from "bootstrap-vue";
import axios from "axios"; // used to communicate with backend database

export default {
  /* eslint-disable no-console */
  name: "CreateReview",
  data() {
    return {
      status: "",
      profVal: "",
      courseVal: "",
      errors: [],
      professors: [],
      courses: [],
      new_review: {
        professor_id: 0,
        course_id: 0,
        rating: 0,
        comment: ""
      }
    };
  },
  computed: {
    professorDisabled() {
      if (this.propProfessor != null) {
        return true;
      }
      return false;
    },
    courseDisabled() {
      if (this.propCourse != null) {
        return true;
      }
      return false;
    }
  },
  methods: {
    show() {
      this.resetModal();

      if (this.propProfessor != null) {
        this.new_review.professor_id = this.propProfessor.id;

        this.loadCourses();
      } else if (this.propCourse != null) {
        this.new_review.course_id = this.propCourse.id;
        this.loadProfessors();
      } else {
        this.loadCourses();
        this.loadProfessors();
      }
    },
    submit(event) {
      event.preventDefault();
      this.errors = [];
      if (this.validateFields()) {
        this.saveReview();
      }
    },
    validateFields() {
      var ret = true;
      if (this.new_review.professor_id == 0) {
        this.errors.push("Professor Not Selected");
        // don't do anything
        ret = false;
      }

      if (this.new_review.course_id == 0) {
        this.errors.push("Course Not Selected");

        // don't do anything
        ret = false;
      }

      if (this.new_review.rating == 0) {
        this.errors.push("Ranking Not Selected");

        // don't do anything
        ret = false;
      }
      return ret;
    },
    saveReview() {
      return new Promise((resolve, reject) => {
        this.status = "loading"; // We can show a loading wheel while in this state
        axios({ url: "/reviews", data: this.new_review, method: "POST" })
          .then(resp => {
            this.$emit("add-new-review", resp.data);
            this.status = "success";
            resolve(resp);
            this.closeModal();
          })
          .catch(err => {
            this.status = "error";
            var resp = err.response;
            if (
              (resp.status == 400) &
              (JSON.stringify(resp.data) ===
                JSON.stringify({
                  non_field_errors: [
                    "The fields course, professor, reviewer must make a unique set."
                  ]
                }))
            ) {
              this.errors.push(
                "You've Already Reviewed This Professor & Course!"
              );
            } else {
              this.errors.push("Error!");
            }
          });
      });
    },
    resetModal() {
      // reset the value, so that if the window gets closed
      // and opened again, that nothing will happen
      this.new_review = {
        professor_id: 0,
        course_id: 0,
        rating: 0,
        comment: ""
      };
      this.status = "";
      this.errors = [];
    },
    closeModal() {
      // close the window
      this.$bvModal.hide("review-modal");
    },
    loadProfessors() {
      new Promise((resolve, reject) => {
        this.status = "loading"; // we can show a loading wheel while in this state
        axios({
          url: "/professors",
          method: "GET"
        })
          .then(resp => {
            this.professors = resp.data;
            this.status = "success";
            resolve(resp);
          })
          .catch(err => {
            this.status = "error";
            reject(err);
          });
      });
    },
    loadCourses() {
      new Promise((resolve, reject) => {
        this.status = "loading"; // we can show a loading wheel while in this state
        axios({
          url: "/courses",
          method: "GET"
        })
          .then(resp => {
            this.courses = resp.data;
            this.status = "success";
            resolve(resp);
          })
          .catch(err => {
            this.status = "error";
            reject(err);
          });
      });
    },
    setProfessor(value) {
      this.new_review.professor_id = value.id;
    },
    setCourse(value) {
      this.new_review.course_id = value.id;
    },
    createProfessor(newOption) {
      new Promise((resolve, reject) => {
        this.status = "loading"; // we can show a loading wheel while in this state
        axios({
          url: "/professors",
          method: "POST",
          data: {
            name: newOption
          }
        })
          .then(resp => {
            this.professors.push(resp.data);
            this.profVal = resp.data.name;
            this.new_review.professor_id = resp.data.id;
            this.status = "success";
            resolve(resp);
          })
          .catch(err => {
            this.status = "error";
            reject(err);
          });
      });
    },
    createCourse(newOption) {
      // check to see if the new option fits our regular expression
      var courseRE = new RegExp("^[A-Z]{3}[A-Z]?[1-9][0-9]{2}$");
      if (!courseRE.test(newOption)) {
        this.$bvToast.toast(
          "Must Be Three/Four Uppercase Letters Followed By A Three-Digit Number",
          {
            title: `Invalid Course Name`,
            variant: "warning",
            solid: true
          }
        );

        return;
      } else {
        new Promise((resolve, reject) => {
          this.status = "loading"; // we can show a loading wheel while in this state
          axios({
            url: "/courses",
            method: "POST",
            data: {
              name: newOption
            }
          })
            .then(resp => {
              this.courses.push(resp.data);
              this.courseVal = resp.data.name;
              this.new_review.course_id = resp.data.id;
              this.status = "success";
              resolve(resp);
            })
            .catch(err => {
              this.status = "error";
              reject(err);
            });
        });
      }
    }
  },
  props: {
    propProfessor: Object,
    propCourse: Object
  },
  components: {
    StarRating
  }
};
</script>



