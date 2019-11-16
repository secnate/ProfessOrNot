// This modal is shown as the second modal for registering a professor
<template>
  <div>
    <b-modal 
    id="review-modal"
    title="Add Class Review"
    ok-title="Next"
    v-bind:hideFooter="true"
    @show="handleShow"
    @close="handleClose"
    >
      
    <b-form @submit="handleNext">

        <b-form-group
          label="Professor's Name"
        > 
            <b-form-input
                id="input-name"
                v-model="enteredProfessorName"
                type="text"
                required
                placeholder="Professor Name"
                :disabled="freezeProfessorName"
            ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Course Name (Three or Four Uppercase Letters + Three Digits)"
        > 
            <b-form-input
                id="input-school"
                v-model="courseName"
                type="text"
                required
                pattern="[A-Z]{3}[A-Z]?[1-9][0-9]{2}"
                placeholder="Course Name"
                :disabled="freezeCourseName"
            ></b-form-input>
        </b-form-group>


        <b-form-group label="Ranking"> 
            <StarRating v-model="starRating" v-bind:star-size="30"/>
        </b-form-group>

        <br/>
        
        <b-form-group
          label="Enter Comments"
        > 
            <b-form-textarea
                id="comment-textarea"
                v-model="comments"
                type="text"
                required
                placeholder="Enter something..."
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
import StarRating from 'vue-star-rating';
import ModalPlugin from 'bootstrap-vue';

export default {
  /* eslint-disable no-console */
  name: "ProfessorReview",
  computed: {
  },
  data() {
      return {
          enteredProfessorName: "",
          courseName: "",
          starRating: null,
          comments: "",
          freezeProfessorName: false,
          freezeCourseName: false
      }
  },
  methods: {
      handleNext(event) {
          event.preventDefault()

          var result = this.getStarRating();
          if (result == null) {
              // Display message that ranking wasn't entered
              this.$bvToast.toast('Please Enter Your Star Ranking Of The Course.', {
                title: `Incomplete Information`,
                variant: 'warning',
                solid: true,
                toaster:'b-toaster-top-full'
            })
          }
          else {
              console.log("DEBUG: the course's professor is: " + this.enteredProfessorName)
              console.log("DEBUG: the course name is: " + this.courseName);
              console.log("DEBUG: the ranking is: " + result);
              console.log("DEBUG: the comments are: " + this.comments);

              console.log("\nDEBUG: testing prop values");
              console.log("DEBUG: professorNameProp is: " + this.professorNameProp);
              console.log("DEBUG: professorIDProp is: " + this.professorIDProp);
              console.log("DEBUG: courseNameProp is: " + this.courseNameProp);
              console.log("DEBUG: courseIDProp is: " + this.courseIDProp);
              
              // clean the modal's data and close the window
              this.handleClose();
              this.closeModal();
          }
      },
      getStarRating() {
          return this.starRating;
      },
      resetModalData() {
          // reset the value, so that if the window gets closed 
          // and opened again, that nothing will happen
          this.enteredProfessorName= "";
          this.courseName= "";
          this.starRating= null;
          this.comments= "";
          this.freezeCourseName = false;
          this.freezeProfessorName = false;
      },
      closeModal() {

          // close the window
          this.$bvModal.hide('review-modal');
      },
      handleShow() {
          // this is the function that handles when 
          // the modal is about to be shown
          console.log("SHOWING MODAL");

          // first we check the props and see if something valid is passed
          this.checkProps();
      },
      handleClose() {
          // this is the function that handles when the modal is to be closed
          console.log("CLOSING MODAL");

          // we want the data to be reset when closing
          this.resetModalData();
      },
      checkProps() {
          // we check if there was a valid professor and/or a valid course passed in as a prop
          // We freeze the form value if either the ID is not zero or the string is not empty
          //
          // check professor name 
          if (this.professorNameProp !== "" || this.professorIDProp !== 0) {
              this.enteredProfessorName = this.professorNameProp;
              this.freezeProfessorName = true;
          }
          // check course name
          if (this.courseNameProp !== "" || this.courseIDProp !== 0) {
              this.courseName = this.courseNameProp;
              this.freezeCourseName = true;
          }
      }
  },
  props: {
      ModalPlugin,
      professorNameProp: {
          type: String, 
          default: ""
      },
      professorIDProp: {
          type: Number,
          default: 0
      },
      courseNameProp: {
          type: String,
          default: ""
      }, 
      courseIDProp: {
          type: Number, 
          default: 0
      },
  },
  components: {
      StarRating
  }
};

</script>

