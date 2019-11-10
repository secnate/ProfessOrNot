<template>
  <div class="newProfPopover">
    <b-modal 
    id="new-prof-modal"
    title="New Professor"
    ok-title="Submit"
    v-bind:hideFooter="true"
    :no-stacking="true"
    ref="new-prof-modal">

    <b-form @submit="handleSubmit">

        <b-form-group
          label="Name"
        > 
            <b-form-input
                id="input-name"
                v-model="newprof.name"
                type="text"
                required
                placeholder="Professor Name"
            ></b-form-input>
        </b-form-group>

        {{/** We have the disabled attribute since we 
          * assume that everyone shares the same school 
          */}}
        <b-form-group
          label="University"
        > 
            <b-form-input
                id="input-school"
                v-model="newprof.university"
                type="text"
                required
                disabled 
                placeholder="University Name"
            ></b-form-input>
        </b-form-group>
        <br>

        <div class="submitButtonRow">
          <b-button class="submitButton" type="submit" variant="primary" pill>
              Submit
          </b-button>

        </div>
    </b-form>
      
  </b-modal>
  </div>

</template>

<script>
import ModalPlugin from 'bootstrap-vue';
import {EventBus} from "../main.js";

export default {
  /* eslint-disable no-console */
  name: "NewProf",
  computed: {
  },
  data() {
      return {
          newprof: {
              name: "",
              university: "University of South Carolina"
          }
      }
  },
  methods: {
      handleSubmit(evt) {

          evt.preventDefault()

          console.log("DEBUG: got following new professor info")
          console.log("\tName: " + this.newprof.name)
          console.log("\tUniversity: " + this.newprof.university)   
          console.log("All this data needs to be saved NOW in the backend");

          this.$bvToast.toast('Professor "' + this.newprof.name + '" was added to ProfessOrNot', {
            title: 'Added New Professor',
            variant: 'success',
            solid: true,
            toaster:'b-toaster-top-left'
          })

          // Clear things up so that if the modal gets closed 
          // and opened again, that the old entered data doesn't appear
          this.newprof = {
              name: "",
              university: "University of South Carolina"
          }

          this.$bvModal.hide('new-prof-modal')
      }
  },
  props: {
      ModalPlugin
  },
  EventBus
};
</script>

<style>
.submitButtonRow{
  float: right;
}

.submitButton {
}
</style>
