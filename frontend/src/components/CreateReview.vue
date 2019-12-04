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
  computed: {
    professorDisabled() {
      if (this.propProfessor != null) {
        return true
      }
      return false
    },
    courseDisabled() {
      if (this.propCourse != null) {
        return true
      }
      return false
    },
  },
  methods: {
    show() {
      this.resetModal();

      if (this.propProfessor != null) {
        this.new_review.professor_id = this.propProfessor.id;

        this.loadCourses()
      }
      else if (this.propCourse != null) {
        this.new_review.course_id = this.propCourse.id;
        this.loadProfessors()
      }
      else {
        this.loadCourses()
        this.loadProfessors()
      }
    },
    submit(event) {
      event.preventDefault();

      // Check if the fields were entered in a valid fashion, 
      // otherwise display notification that it was entered incorrectly
      if (this.new_review.professor_id == 0) {
        this.$bvToast.toast('No Professor Entered', {
                title: `Required Professor  Name Not Entered`,
                variant: 'warning',
                solid: true,
                toaster:'b-toaster-top-full'
        })

        // don't do anything
        return;
      }

      if (this.new_review.course_id == 0) {
        this.$bvToast.toast('No Course Entered', {
                title: `Required Course  Name Not Entered`,
                variant: 'warning',
                solid: true,
                toaster:'b-toaster-top-full'
        })

        // don't do anything
        return;
      }

      if (this.new_review.rating == 0) {

        this.$bvToast.toast('Enter Your Rating On The Scale Of 1-5 Stars', {
                title: `Required Rating Not Entered`,
                variant: 'warning',
                solid: true,
                toaster:'b-toaster-top-full'
        })

        // don't do anything
        return;
      }

      // All is good -- can save the fields and close it up
      /*this.saveReview();
      this.closeModal();*/
    },
    saveReview() {
      return new Promise((resolve, reject) => {
        this.status = "loading"; // We can show a loading wheel while in this state
        axios({ url: "/reviews", data: this.new_review, method: "POST" })
          .then(resp => {
            this.$emit('add-new-review', resp.data)
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
      this.status = "";
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
            this.new_review.professor_id = resp.data.id
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

      // check to see if the new option fits our regular expression
      var courseRE = new RegExp("^[A-Z]{3}[A-Z]?[1-9][0-9]{2}$")
      if (!courseRE.test(newOption)) {
        this.$bvToast.toast('Must Be Three/Four Uppercase Letters Followed By A Three-Digit Number', {
          title: `Invalid Course Name`,
          variant: 'warning',
          solid: true
        })

        return;
      }
      else {
        new Promise((resolve, reject) => {
          this.status = "loading"; // we can show a loading wheel while in this state
          axios({
            url: "/courses",
            method: "POST",
            data: newOption
          })
            .then(resp => {
              this.courses.push(resp.data);
              this.new_review.course_id = resp.data.id
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



