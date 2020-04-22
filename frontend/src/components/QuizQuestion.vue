<!--This represents a multiple choice learning style quiz question with four answer choices-->

<template>
  <div class="quizCard">
    <b-card class="mb-2" :class="{quizCardFill : showAsUnanswered}" border-variant="secondary" text-variant="black" style="margin-left: 10%; width: 80%;">
      <b-card-title class="cardTitle">{{ this.question.text }}</b-card-title>
      <div v-if="scale">
        <b-form-radio-group v-model="selected" size="lg">
          <span v-for="option in this.scaledOptions" v-bind:key="option.id">
            <b-form-radio
              v-model="selected"
              name="mc-radios"
              :value="option.id"
              style="font-size: 15pt;"
              v-on:input="saveChange()"
            >{{option.text}}</b-form-radio>
          </span>
        </b-form-radio-group>
      </div>
      <div v-else>
        <b-form-radio-group v-model="selected" size="lg" stacked>
          <span v-for="option in this.question.options" v-bind:key="option.id">
            <b-form-radio
              v-model="selected"
              name="mc-radios"
              :value="option.id"
              style="margin-left: 10px; text-align: left; font-size: 15pt;"
              v-on:input="saveChange()"
            >{{option.text}}</b-form-radio>
          </span>
        </b-form-radio-group>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "QuizQuestion",
  components: {},
  data() {
    return {
      selected: -1,
      // The options array allows for the dynamic generation of the options in an easiliy-updatable fashion
      scaledOptions: [
        { text: "Strongly Disagree", id: 1 },
        { text: "Disagree", id: 2 },
        { text: "Neither", id: 3 },
        { text: "Agree", id: 4 },
        { text: "Strongly Agree", id: 5 }
      ]
    };
  },
  methods: {
    saveChange() {
      // 200ms debounce function
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        var payload = {
          questionId: this.question.id,
          responseId: this.selected
        };
        // Dispatch selection to Vuex
        this.$store.dispatch("quiz_selection", payload);
      }, 200);
    }
  },
  computed: {
    scale() {
      if (this.question.type === "sc") {
        return true;
      }
      return false;
    },
    showAsUnanswered() {
      if(this.$store.state.quiz.showUnanswered == true && this.selected == -1) {
        return true;
      }
      return false;
    }
  },
  props: {
    question: Object
  }
};
</script>


<style scoped>
.cardTitle {
  font-style: bold;
  font-size: 20pt;
}
.quizCardFill {
  background-color: rgba(247, 78, 78, 0.4);
}
</style>