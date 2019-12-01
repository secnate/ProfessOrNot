// This modal is shown as the second modal for registering a professor
<template>
  <div>
    <b-modal 
    id="new-course-prof-modal"
    title='Add New Professor/Course?'
    ok-title="Next"
    v-bind:hideFooter="true"
    @show="handleShow"
    @hide="handleHide"
    >
      
    <h1 id="messageTitle">
      You Searched: "{{this.enteredText}}"
    </h1>
    <h2 id="message"> 
      Such A Professor Or Class Doesn't Exist.
    </h2>
    <h2 id="message">
      Would You Like To Create A New Instance? 
    </h2>

      <b-button variant="outline-primary" id="new-prof-button" @click="handleNewProfessor">
        New Professor "{{this.enteredText}}"
      </b-button>

      <b-button variant="outline-primary" id="new-course-button" @click="handleNewCourse">
        New Course "{{this.enteredText}}"
      </b-button>

  </b-modal>

  </div>

</template>

<script>
import ModalPlugin from 'bootstrap-vue';
import axios from "axios"; // Communicates w/ backend
import router from "../router.js";

export default {
  /* eslint-disable no-console */
  name: "NewCourseOrProf",
  data() {
      return {
      }
  },
  computed: {
  },
  methods: {
    handleNewCourse() {

      // we check if the input is valid
      var re = new RegExp("^[A-Z]{3}[A-Z]?[1-9][0-9]{2}$");

      if (re.test(this.enteredText)) {

        // the course text is valid
        new Promise( (resolve, reject) => {
                  this.status = 'loading'

                  var dataToPassIn = {"name" : this.enteredText };
                  axios({ url: "/courses", data: dataToPassIn, method: "POST" })
                            .then( resp => {
                                console.log(resp)

                                this.status = 'success'
                                var newCourseID = resp.data.id
                                resolve(resp)

                                // go to the next page
                                router.push({ name: 'course', params: { courseId: newCourseID }})
                            })
                            .catch( err => {
                                console.log(err);
                                this.status = 'error'

                                reject(err)
                            });

        });
      }
      else {
        this.closeModal()

        this.$bvToast.toast('Entered Course Name Must Have Three Or Four Uppercase Letters + Three Digits', {
                title: `Invalid Course Name`,
                variant: 'warning',
                solid: true,
                toaster:'b-toaster-top-full'
        })
      }
      
    },
    handleNewProfessor() {
      // I create a new professor object
      new Promise( (resolve, reject) => {
              this.status = 'loading' // we can show a loading wheel while in this state 

              var dataToPassIn = { "name" : this.enteredText }
              axios({ url: "/professors", data: dataToPassIn, method: "POST" })
                            .then( resp => {
                                console.log(resp)

                                this.status = 'success'
                                var newInputProfId = resp.data.id

                                 router.push({ name: 'professor', params: { profId: newInputProfId }})

                                resolve(resp)
                            })
                            .catch( err => {
                                console.log(err);
                                this.status = 'error'

                                reject(err)
                            });
        });
    },
    handleShow() {
      this.resetData()
    },
    handleHide() {
    },
    resetData() {
    },
    closeModal() {
      this.$bvModal.hide('new-course-prof-modal')
    },
    displayReviewModal() {
      // display modal
      // close this
    }
  },
  props: {
      ModalPlugin,
      enteredText: {
        type: String,
        default: ""
      }
  },
  components: {
  }
};

</script>

<style>

#messageTitle {
  font-size: 20pt;
  text-align: center;
}

#message {
  font-size: 15pt;
  padding-top: 5px;
}

#new-course-button {
  margin-left: 20px;
}
</style>



