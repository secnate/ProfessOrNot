<!--This represents a learning style quiz question with five answer choices regarding levels-->

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
      >
        <span v-for="obj in this.options" v-bind:key="JSON.stringify(obj)">

          <b-form-radio 
            v-model="selected" 
            name="mc-radios" 
            :value="obj.id"
            style="font-size: 15pt;"
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
  name: "ScaleQuizQuestion",
  components: {
  },
  data() {
    return {
      selected: '',
      // The options array allows for the dynamic generation of the options in an easiliy-updatable fashion
      // five is the best, one is the worst
      options: [
        {text: "Strongly Disagree", id: 1},
        {text: "Disagree", id: 2},
        {text: "Neither", id: 3},
        {text: "Agree", id: 4},
        {text: "Strongly Agree", id: 5},
      ]
    };
  },
  methods: {
    saveChange() {
      // will need to modify this to have the vuex event save
      this.$store.dispatch('set_user_answer',{ question_id: this.questionId, answer_index: this.selected });
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