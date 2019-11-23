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


        <label>Professor's Name</label>
            
            <b-form-input
                id="input-name"
                v-model="enteredProfessorName"
                type="text"
                required
                placeholder="Professor Name"
                :disabled="freezeProfessorName"
                @input="nameInputChanged"
                autocomplete="off"
                list="prof-name-list-id"
            ></b-form-input>
            <datalist id="prof-name-list-id">
                <option v-for="prof in arrayProfs" v-bind:key="prof.name + prof.id">{{prof.name}}</option>
            </datalist>

        <label> Course Name (Three or Four Uppercase Letters + Three Digits) </label>
            <b-form-input
                id="input-school"
                v-model="courseName"
                type="text"
                required
                pattern="[A-Z]{3}[A-Z]?[1-9][0-9]{2}"
                placeholder="Course Name"
                :disabled="freezeCourseName"
                autocomplete="off"
                @input="courseInputChanged"
                list="course-name-list-id"
            ></b-form-input>
            <datalist id="course-name-list-id">
                <option v-for="course in arrayCourses" v-bind:key="course.name + course.id">{{course.name}}</option>
            </datalist>


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
                autocomplete="off"
                type="text"
                required
                placeholder="Enter something..."
            ></b-form-textarea>
        </b-form-group>

        <div class="submitButtonRow">
          <b-button id="submit-button" class="submitButton" type="submit" variant="primary" pill>Finish</b-button>
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

          //default values, they will be updated once the backend is queried
          arrayCourses: [
          ],       

          newProfOrCourseDefaultID: 0,      // the database isn't supposed to have items with ID = 0

          new_review: {                      // this is what we will send to the server for saving
              professor_id: 0,
              course_id: 0,
              rating: 0,
              comment: ""
          },

          submitted: false,

          idOfInputtedCourse: 0,
          idOfInputtedProfessor: 0

      }
  },
  computed: {
  },
  methods: {
      handleNext(event) {
          event.preventDefault()

          var result = this.getStarRating();

          // first we test inputs
          if (result == null) {
              // Display message that ranking wasn't entered
              this.$bvToast.toast('Please Enter Your Star Ranking Of The Course.', {
                title: `Incomplete Information`,
                variant: 'warning',
                solid: true,
                toaster:'b-toaster-top-full'
            })
          }
          else if (this.arrayProfs.length === 0) {
              // we didn't load any information from the backend database yet
              // and thus we have an empty array
              // Display message that ranking wasn't entered
              this.$bvToast.toast('Please Enter Valid Professor Name', {
                title: `Incomplete Information`,
                variant: 'warning',
                solid: true,
                toaster:'b-toaster-top-full'
              })
          }
          else {
              // submit review, clean the modal's data and close the window
              this.submitReview();
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
              professor_id: this.newProfOrCourseDefaultID,
              course_id: this.newProfOrCourseDefaultID,
              rating: 0,
              comment: ""
          }

          // we reset the previous-entered data
          this.previousEnteredCourseName = "";
          this.previousEnteredProfName = "";

          // we already submitted
          this.submitted=false;

          this.idOfInputtedCourse = 0,
          this.idOfInputtedProfessor = 0
      },
      closeModal() {
          // prepare for and close the window
          this.handleClose();
          this.$bvModal.hide('review-modal');
      },
      handleShow() {
          // this is the function that handles when 
          // the modal is about to be shown

          // first we check the props and see if something valid is passed
          this.resetModalData()
          this.checkProps()
      },
      handleClose() {
          // this is the function that handles when the modal is to be closed

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
              this.getProfessorsFromBackend();
          }
          if (this.enteredProfessorName.length < this.NUM_CHARS_TO_QUERY_BACKEND_AT &&
              this.previousEnteredProfName.length > this.enteredProfessorName.length) {
              // going downwards. one character isn't enough for suggestions
              this.arrayProfs = []
          }

          // entering data for next round 
          this.previousEnteredProfName = this.enteredProfessorName;

          // I check to see if I entered in a name for an already-valid professor. If yes, then the whole text-input schtick is not needed
          if (this.arrayProfs.length != 0 && this.inputIsOfAnExistingProfessor() ) {
                this.arrayProfs[this.arrayProfs.length-1].name =""
            } 

          if (this.arrayProfs.length != 0 && !this.inputIsOfAnExistingProfessor()) {
              // if there is an array, I take the last item from it, 

            // and update the string for a prof that isn't in the database, if the item I selected 
            // isn't already a professor that isn't in the database and is denoted as such
            this.arrayProfs[this.arrayProfs.length - 1].name = this.getNewProfessorItemString()
          }
      },
      courseInputChanged() {
        
          // this is the method used to query the backend for new data when input is entered 

          // if we now passed the two-character barrier and are going upwards adding new characters
          // and are not doing the opposite (i.e. deleting chars from a string going downwards)
          if (this.courseName.length == this.NUM_CHARS_TO_QUERY_BACKEND_AT &&
              this.previousEnteredCourseName.length < this.courseName.length) {
              this.getCoursesFromBackend();
          }

          if (this.courseName.length < this.NUM_CHARS_TO_QUERY_BACKEND_AT &&
              this.previousEnteredCourseName.length > this.previousEnteredCourseName.length) {
              // going downwards. one character isn't enough for suggestions
              this.arrayCourses = []
          }

          // entering data for next round 
          this.previousEnteredCourseName = this.courseName;

          // I check to see if I entered in a name for an already-valid class. If yes, then the whole text-input schtick is not needed
          if (this.arrayCourses.length != 0 && this.inputIsOfAnExistingCourse() ) {
                this.arrayCourses[this.arrayCourses.length-1].name =""
            } 

          if (this.arrayCourses.length != 0 && !this.inputIsOfAnExistingCourse()) {
              // if there is an array, I take the last item from it, 
            // and update the string for a prof that isn't in the database, if the item I selected 
            // isn't already a professor that isn't in the database and is denoted as such
            this.arrayCourses[this.arrayCourses.length - 1].name = this.getNewCourseItemString()
            
          }
      },
      getProfessorsFromBackend() {

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
                                this.arrayProfs.push({ id: this.newProfOrCourseDefaultID, name: this.getNewProfessorItemString() })

                                this.status = 'success'

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
          return this.enteredProfessorName
      },
      getCoursesFromBackend() {

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
                                this.arrayCourses.push({ id: this.newProfOrCourseDefaultID, name: this.getNewCourseItemString() })

                                this.status = 'success'

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
          return this.courseName;
      },
      inputIsOfAnExistingProfessor() {
          // we check if the input is of an existing and valid professor
          var toSearchOver = this.arrayProfs.slice(0, this.arrayProfs.length-1)

          var i = 0;
          for (i = 0; i < toSearchOver.length; i++) {
              if (toSearchOver[i].name === this.enteredProfessorName) {
                  return true;
              }
          }

          return false;
      }, 
      inputIsOfAnExistingCourse() {
          // we check if the input is of an existing and valid professor
          var toSearchOver = this.arrayCourses.slice(0, this.arrayCourses.length-1)

          var i = 0;
          for (i = 0; i < toSearchOver.length; i++) {
              if (toSearchOver[i].name === this.courseName) {
                  return true;
              }
          }

          return false;
      },
      createNewReview(prof_id, crs_id, rtng, cmnt) {
          // create a new review for existing professor and course
          return new Promise( (resolve, reject) => {
              this.status = 'loading' // we can show a loading wheel while in this state 

              var dataToPassIn = { "professor_id": prof_id, "course_id" : crs_id, "rating" : rtng, "comment": cmnt }
              axios({ url: "/reviews", data: dataToPassIn, method: "POST" })
                            .then( resp => {
                                console.log(resp)

                                this.status = 'success'

                                resolve(resp)


                                // we are done now. close the modal
                                this.closeModal()
                            })
                            .catch( err => {
                                console.log(err);
                                this.status = 'error'

                                reject(err)
                            });
            });
      },
      submitReview() {
          var createNewProfessorOBJ = false
          var createNewCourseOBJ = false 

          // first I examine if I need to createnewProfessorOBJ 

          // ---------------------------------------------------------------------------------------
          this.idOfInputtedProfessor = this.newProfOrCourseDefaultID;    // some empty value; it will get updated later on
          if (this.freezeProfessorName) {
              // I assume that the props passed in have a valid name and id, so I won't check it 
              this.idOfInputtedProfessor = this.professorIDProp
              createNewProfessorOBJ = false
          }
          else {
              // the professor was entered through the input field

              var i = 0
              for (i = 0; i < this.arrayProfs.length; i++) {
                if (this.arrayProfs[i].name === this.enteredProfessorName) {
                    this.idOfInputtedProfessor = this.arrayProfs[i].id
                    break
                }
            }

            if (this.idOfInputtedProfessor == this.newProfOrCourseDefaultID) {
                createNewProfessorOBJ = true
            }
          }

          // now I examine if I need to create a new course object 
          // ---------------------------------------------------------------------------------------
          this.idOfInputtedCourse = this.newProfOrCourseDefaultID;    // some empty value; it will get updated later on
          if (this.freezeCourseName) {
              // I assume that the props passed in have a valid name and id, so I won't check it 
              this.idOfInputtedCourse = this.courseIDProp
              createNewCourseOBJ = false
          }
          else {
              // the course was entered through the input field

              i = 0
              for (i = 0; i < this.arrayCourses.length; i++) {
                if (this.arrayCourses[i].name === this.courseName) {
                    this.idOfInputtedCourse = this.arrayCourses[i].id
                    break
                }
            }

            if (this.idOfInputtedCourse == this.newProfOrCourseDefaultID) {
                createNewCourseOBJ = true
            }
          }

          // ---------------------------------------------------------------------------------------


          // I now consider all possible cases
          if (!createNewCourseOBJ  && !createNewProfessorOBJ) {
              // I just create a new review and close the thing 
              this.createNewReview(this.idOfInputtedProfessor, this.idOfInputtedCourse, this.starRating, this.comments)
          }

          
          else if (!createNewCourseOBJ && createNewProfessorOBJ) {
              // I create a new professor object and then create a new review for an existing class

              new Promise( (resolve, reject) => {
              this.status = 'loading' // we can show a loading wheel while in this state 

              var dataToPassIn = { "name" : this.enteredProfessorName }
              axios({ url: "/professors", data: dataToPassIn, method: "POST" })
                            .then( resp => {
                                console.log(resp)

                                this.status = 'success'
                                var newInputProfId = resp.data.id

                                this.createNewReview(newInputProfId, this.idOfInputtedCourse, this.starRating, this.comments)
                                resolve(resp)
                            })
                            .catch( err => {
                                console.log(err);
                                this.status = 'error'

                                reject(err)
                            });
            });
          }
          else if (createNewCourseOBJ && !createNewProfessorOBJ) {
              new Promise( (resolve, reject) => {
                  this.status = 'loading'

                  var dataToPassIn = {"name" : this.courseName };
                  axios({ url: "/courses", data: dataToPassIn, method: "POST" })
                            .then( resp => {
                                console.log(resp)

                                this.status = 'success'
                                var newCourseID = resp.data.id

                                this.createNewReview(this.idOfInputtedProfessor, newCourseID, this.starRating, this.comments)
                                resolve(resp)
                            })
                            .catch( err => {
                                console.log(err);
                                this.status = 'error'

                                reject(err)
                            });

              });
          }
          else {

              // I create a new course
              new Promise( (resolve, reject) => {
                  this.status = 'loading'

                  var dataToPassIn = {"name" : this.courseName };
                  // I create a new course
                  axios({ url: "/courses", data: dataToPassIn, method: "POST" })
                            .then( resp => {
                                console.log(resp)

                                this.status = 'success'
                                this.idOfInputtedCourse = resp.data.id

                                // I create a new professor
                                new Promise( (resolve, reject) => {
                                    this.status = 'loading' // we can show a loading wheel while in this state 

                                    var dataToPassInSecondRound = { "name" : this.enteredProfessorName }
                                    axios({ url: "/professors", data: dataToPassInSecondRound, method: "POST" })
                                        .then( resp => {
                                        console.log(resp)

                                        this.idOfInputtedProfessor = resp.data.id

                                        this.status = 'success'

                                        this.createNewReview(this.idOfInputtedProfessor, this.idOfInputtedCourse, this.starRating, this.comments)
                                        resolve(resp)
                                    })
                                    .catch( err => {
                                    console.log(err);
                                    this.status = 'error'

                                        reject(err)
                                    });
                                });

                                resolve(resp)
                            })
                            .catch( err => {
                                console.log(err);
                                this.status = 'error'

                                reject(err)
                            });

              });
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



