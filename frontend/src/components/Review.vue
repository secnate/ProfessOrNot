// This modal is shown as the second modal for registering a professor
<template>
  <div>
    <b-modal 
    id="review-modal"
    title="Add Class Review"
    ok-title="Next"
    v-bind:hideFooter="true"
    >
      
    <b-form @submit="handleNext">

        <b-form-group
          label="Professor's Name"
        > 
            <b-form-input
                id="input-name"
                v-model="professorName"
                type="text"
                required
                placeholder="Professor Name"
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
          professorName: "",
          courseName: "",
          starRating: null,
          comments: ""
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
              console.log("DEBUG: the course's professor is: " + this.professorName)
              console.log("DEBUG: the course name is: " + this.courseName);
              console.log("DEBUG: the ranking is: " + result);
              console.log("DEBUG: the comments are: " + this.comments);

              
              this.closeModal();
              // clean the modal's data and close the window
              this.resetModal();
          }
      },
      getStarRating() {
          return this.starRating;
      },
      resetModal() {
          // reset the value, so that if the window gets closed 
          // and opened again, that nothing will happen
          this.professorName= "";
          this.courseName= "";
          this.starRating= null;
          this.comments= "";
      },
      closeModal() {

          // close the window
          this.$bvModal.hide('review-modal');
      }
  },
  props: {
      ModalPlugin

  },
  components: {
      StarRating
  }
};

</script>

