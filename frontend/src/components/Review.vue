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
                @input="nameInputChanged"
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
                @input="courseInputChanged"
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
import axios from "axios"; // used to communicate with backend database

export default {
  /* eslint-disable no-console */
  name: "ProfessorReview",
  computed: {
  },
  data() {
      return {
          enteredProfessorName: "",
          previousEnteredProfName: "",
          courseName: "",
          previousEnteredCourseName: "",
          starRating: null,
          comments: "",
          freezeProfessorName: false,
          freezeCourseName: false,
          NUM_CHARS_TO_QUERY_BACKEND_AT: 2,  // after two characters of input, we query backend for data
          // default values. they will be updated once the backend is queried
          arrayProfs: [
          ],
          newProfessorString: " (New Professor)",                

          //default values, they will be updated once the backend is queried
          arrayCourses: [
          ],       
          newCourseString: " (New Course)",

          newProfOrCourseDefaultID: 0,      // the database isn't supposed to have items with ID = 0

          new_review: {                      // this is what we will send to the server for saving
              professor_id: 0,
              course_id: 0,
              rating: 0,
              comment: ""
          },

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


          // we reset the array of options to default values
          this.arrayProfs = []
          this.arrayCourses = [] 

          // we reset the new_review variable since we aren't going to submit anything
          this.new_review = {
              professor_id: 0,
              course_id: 0,
              rating: 0,
              comment: ""
          }

          // we reset the previous-entered data
          this.previousEnteredCourseName = "";
          this.previousEnteredProfName = "";
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
      },
      nameInputChanged() {
          // this is the method used to query the backend for new data when input is entered 

          // if we now passed the two-character barrier and are going upwards adding new characters
          // and are not doing the opposite (i.e. deleting chars from a string going downwards)
          if (this.enteredProfessorName.length == this.NUM_CHARS_TO_QUERY_BACKEND_AT &&
              this.previousEnteredProfName.length < this.enteredProfessorName.length) {
              console.log("DEBUG: enteredProfessorName is: " + this.enteredProfessorName);
              console.log("QUERYING BACKEND DATABASE FOR ARRAY OF NAMES!")
              this.getProfessorsFromBackend();
          }
          if (this.enteredProfessorName.length < this.NUM_CHARS_TO_QUERY_BACKEND_AT &&
              this.previousEnteredProfName.length > this.enteredProfessorName.length) {
              // going downwards. one character isn't enough for suggestions
              this.arrayProfs = []
              console.log("DEBUG: cleared up the professors array")
          }

          // entering data for next round 
          this.previousEnteredProfName = this.enteredProfessorName;

          if (this.arrayProfs.length != 0) {
              // if there is an array, I take the last item from it, 
              // and update the string for a prof that isn't in the database
              this.arrayProfs[this.arrayProfs.length - 1].name = this.getNewProfessorItemString()

              console.log("DEBUG: the new arrayProfs is now: " + JSON.stringify(this.arrayProfs))
          }
      },
      courseInputChanged() {

          // if we now passed the two-character barrier and are going upwards adding new characters
          // and are not doing the opposite (i.e. deleting chars from a string going downwards)
          if (this.courseName.length == this.NUM_CHARS_TO_QUERY_BACKEND_AT && 
              this.previousEnteredCourseName.length < this.courseName.length) {
              console.log("QUERYING BACKEND DATABASE FOR ARRAY OF COURSE NAMES!")
              this.getCoursesFromBackend();
          }

          if (this.courseName.length < this.NUM_CHARS_TO_QUERY_BACKEND_AT &&
              this.previousEnteredCourseName.length > this.courseName.length) {
              // going downwards. on character isn't enough for suggestions
              this.arrayCourses = []
              console.log("DEBUG: cleared up the courses array: " + JSON.stringify(this.arrayCourses))
          }

          // updating data for next round 
          this.previousEnteredCourseName = this.courseName;

          if (this.arrayCourses.length != 0) {
              // if there is an array, I take the last item from it, 
              // and update the string for a course that isn't in the database
              this.arrayCourses[this.arrayCourses.length - 1].name = this.getNewCourseItemString()

              console.log("DEBUG: the new arrayCourses is now: " + JSON.stringify(this.arrayCourses))
          }

      },
      getProfessorsFromBackend() {
          console.log("DEBUG: getting the professors from backend");

          // get the professors from the backend
          // add in a dummy value to the end of the list with id value 0. 
          // we will be adjusting its name from there
          new Promise( (resolve, reject) => {
              this.status = 'loading' // we can show a loading wheel while in this state 

              var dataToPassIn = { filter: this.enteredProfessorName }
              axios({ url: "/professors?filter=" + this.enteredProfessorName, data: dataToPassIn, method: "GET" })
                            .then( resp => {
                                console.log(resp)
                                this.arrayProfs = resp.data


                                // I now append the default object that will represent the case 
                                // where a user enters in a new professor that is not in the database
                                this.arrayProfs.push({ id: 0, name: this.getNewProfessorItemString() })

                                this.status = 'success'

                                console.log("DEBUG: this.arrayProfs is: " + JSON.stringify(this.arrayProfs))

                                resolve(resp)
                            })
                            .catch( err => {
                                console.log(err);
                                this.status = 'error'

                                reject(err)
                            });
            });
      },
      getNewProfessorItemString() {
          // if the user enters in a name for a professor not in the database, we get its string for a suggestion to be added
          return this.enteredProfessorName + this.newProfessorString;
      },
      getCoursesFromBackend() {
          console.log("DEBUG: getting the courses from backend");

          // get the professors from the backend
          // add in a dummy value to the end of the list with id value 0. 
          // we will be adjusting its name from there
          new Promise( (resolve, reject) => {
              this.status = 'loading' // we can show a loading wheel while in this state 

              var dataToPassIn = { filter: this.courseName }
              axios({ url: "/courses?filter=" + this.courseName, data: dataToPassIn, method: "GET" })
                            .then( resp => {
                                console.log(resp)
                                this.arrayCourses = resp.data


                                // I now append the default object that will represent the case 
                                // where a user enters in a new professor that is not in the database
                                this.arrayCourses.push({ id: 0, name: this.getNewCourseItemString() })

                                this.status = 'success'

                                console.log("DEBUG: this.arrayCourses is: " + JSON.stringify(this.arrayCourses))

                                resolve(resp)
                            })
                            .catch( err => {
                                console.log(err);
                                this.status = 'error'

                                reject(err)
                            });
            });
      },
      getNewCourseItemString() {
          // if the user enters in a name for a course not in the database, we get its string for a suggestion to be added
          return this.courseName + this.newCourseString;
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

