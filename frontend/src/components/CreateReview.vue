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
      <b-form @submit="submit">
        <label>Professor's Name</label>
        <v-select
          :options="professors"
          label="name"
          @input="setProfessor"
          :clearable="false"
          taggable
          @option:created="createProfessor"
          :disabled="professorDisabled"
          :value="propProfessor"
        ></v-select>

        <label>Course Name (Three or Four Uppercase Letters + Three Digits)</label>
        <v-select
          :options="courses"
          label="name"
          @input="setCourse"
          :clearable="false"
          taggable
          @option:created="createCourse"
          :disabled="courseDisabled"
          :value="propCourse"
        ></v-select>

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
  computed: {},
  methods: {
    show() {
      this.loadProfessors();
      this.loadCourses();
    },
    submit(event) {
      event.preventDefault();
      this.saveReview();
      this.closeModal();
      // clean the modal's data and close the window
      this.resetModal();
    },
    saveReview() {
      if (this.propProfessor != null) {
        this.new_review.professor_id = this.propProfessor.id;
      }
      if (this.propCourse != null) {
        this.new_review.course_id = this.propCourse.id;
      }
      return new Promise((resolve, reject) => {
        this.status = "loading"; // We can show a loading wheel while in this state
        axios({ url: "/reviews", data: this.new_review, method: "POST" })
          .then(resp => {
            console.log(resp);
            this.status = "success";
            resolve(resp);
          })
          .catch(err => {
            console.log(err);
            this.status = "error";
            reject(err);
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
            console.log(err);
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
            console.log(err);
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
      console.log(newOption);
      new Promise((resolve, reject) => {
        this.status = "loading"; // we can show a loading wheel while in this state
        axios({
          url: "/professors",
          method: "POST",
          data: newOption
        })
          .then(resp => {
            this.professors.push(resp.data);
            this.status = "success";
            resolve(resp);
          })
          .catch(err => {
            console.log(err);
            this.status = "error";
            reject(err);
          });
      });
    },
    createCourse(newOption) {
      console.log(newOption);
      new Promise((resolve, reject) => {
        this.status = "loading"; // we can show a loading wheel while in this state
        axios({
          url: "/courses",
          method: "POST",
          data: newOption
        })
          .then(resp => {
            this.courses.push(resp.data);
            this.status = "success";
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
    professorDisabled: Boolean,
    courseDisabled: Boolean,
    propProfessor: Object,
    propCourse: Object
  },
  components: {
    StarRating
  }
};
</script>



