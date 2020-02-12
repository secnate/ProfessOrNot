<!--This represents a multiple choice learning style quiz question with four answer choices-->

<template>
  <div>
    <b-card 
      border-variant="secondary"
      style="margin-left: 10%; width: 80%;"
    >
      <b-card-title class="cardTitle">
        {{ this.question }}
      </b-card-title>

      <b-form-radio-group 
        v-model="selected"
        size="lg"
        stacked
      >
        <span v-for="obj in this.choicesArray" v-bind:key="JSON.stringify(obj)">

          <b-form-radio 
            v-model="selected" 
            name="mc-radios" 
            :value="obj.id"
            style="margin-left: 10px; text-align: left; font-size: 15pt;"
            v-on:input="saveChange()"
          >
            {{obj.text}}
          </b-form-radio>
        </span>
        
      </b-form-radio-group>

    </b-card>
  </div>

</template>

<script>

export default {
  name: "MCQuizQuestion",
  components: {
  },
  data() {
    return {
      selected: '',
      // The options array allows for the dynamic generation of the options in an easiliy-updatable fashion
      options: []
    };
  },
  methods: {
    saveChange() {
      // we will need to update this to have the vuex event save.
      this.$store.dispatch('set_user_answer',{ question_id: this.questionId, answer_index: this.selected })
    },
    answered() {
      return this.selected !== '';
    },
    getSelected() {
      return this.selected;
    }
  },
  computed: {
  },
  props: {
    // this is an array containing the four possible choices 
    // with an "id" for each option and the "text" or the value
    // the array is of length four and format [ {id: #, text: ...}, ...]
    // this will be used to then work with the options array
    choicesArray: Array,
    question: String,
    questionId: Number
  }
};
</script>


<style scoped>

.cardTitle {
  font-style: bold;
  font-size: 20pt;
  color: black;
}

</style>