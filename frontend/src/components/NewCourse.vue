<template>
  <div class="newCoursePopover">
    <b-modal 
    id="new-course-modal"
    title="New Course"
    ok-title="Next"
    v-bind:hideFooter="true"
    :no-stacking="true"
    >

    <b-form @submit="handleSubmit">

        {{/** We have the disabled attribute since we 
          * assume that everyone shares the same school 
          */}}
        <b-form-group
          label="University"
        > 
            <b-form-input
                id="input-school"
                v-model="newclass.university"
                type="text"
                required
                disabled 
                placeholder="University Name"
            ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Four-Letter Department Abbreviation (CSCE, RUSS, etc)"
        > 
            <b-form-input
                id="input-school"
                v-model="newclass.department"
                type="text"
                required
                disabled
                pattern="[A-Za-z]{4}"
                placeholder="Four-Letter Department Abbreviation"
            ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Course Number (Three Digits)"
        > 
            <b-form-input
                id="input-school"
                v-model="newclass.number"
                type="text"
                required
                pattern="[1-9][0-9]{2}"
                placeholder="Class Number"
            ></b-form-input>
        </b-form-group>

        <br>

        <div class="submitButtonRow">
          <b-button class="submitButton" type="submit" variant="primary" pill>Submit</b-button>
        </div>
    </b-form>
      
  </b-modal>
  </div>
</template>

<script>
import ModalPlugin from 'bootstrap-vue';

export default {
  /* eslint-disable no-console */
  name: "NewCourse",
  computed: {
  },
  data() {
      return {
          newclass: {
              // The number is in string format in order to have the 
              // regular expressions force users to input a legit three-digit number
              number: "",
              department: "CSCE",
              university: "University of South Carolina"
          }
      }
  },
  methods: {
      handleSubmit(evt) {
          evt.preventDefault()

          // The newclass.number will need to be converted from a string 
          // into a number before being sent to the backend database
          console.log("DEBUG: submitted following new class info")
          console.log("\tUniversity: " + this.newclass.university)
          console.log("\tDepartment: " + this.newclass.department)
          console.log("\tNumber: " + this.newclass.number)

          this.$bvToast.toast('Class "' + this.newclass.department + ' ' + this.newclass.number+ '" was added to ProfessOrNot', {
            title: 'Added New Class',
            variant: 'success',
            solid: true,
            toaster:'b-toaster-top-left'
          })

          // clear things up so that if the modal gets closed 
          // and then reopened again that the data gets cleared up 
          this.newclass = {
              // The number is in string format in order to have the 
              // regular expressions force users to input a legit three-digit number
              number: "",
              department: "CSCE",
              university: "University of South Carolina"
          }

          this.closeModal()
      },
    getClearNewClass() {
      return {
              // The number is in string format in order to have the 
              // regular expressions force users to input a legit three-digit number
              number: "",
              department: "CSCE",
              university: "University of South Carolina"
          }
    },
    closeModal() {
          // close the window
          this.$bvModal.hide('new-course-modal');
      }
  },
  props: {
      ModalPlugin
  }
};
</script>

<style>
.submitButtonRow{
  float: right;
}

.submitButton {
}
</style>
