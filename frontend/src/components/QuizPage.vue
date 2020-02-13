<!--This page asks a user some questions about their preferred learning and class styles-->
<!--For the multiple choice questions, 1-4 represents the first, second, third, and fourth options respectively-->
<!--For the scale question, 1 represents the "strongly disagree case" and 5 represents the "strongly agree" case-->
<!--Questions can be either of type "mc" (multiple choice) or "sc" (scale)-->
<template>
  <div>
    <NavBar />

    <br />

    <h1>Learning Style Quiz</h1>

    <div v-if="status == 'loading'">
      <b-spinner
        label="Loading Questions..."
        variant="primary"
        type="grow"
        style="width: 3rem; height: 3rem;"
      ></b-spinner>
    </div>

    <div v-if="status == 'retrieved'">
      <span v-for="questionObj in this.$store.getters.getQuestions" v-bind:key="questionObj.id">
        <div v-if="questionObj.type == 'mc' ">
          <QuizQuestion
            :questionId="questionObj.id"
            :question="questionObj.text"
            :choicesArray="questionObj.choices"
          />
        </div>

        <!--The Scale Question goes from 1 through 5, strongly disagree to strongly agree-->
        <div v-if="questionObj.type == 'sc'">
          <QuizQuestion :questionId="questionObj.id" :question="questionObj.text" scale />
        </div>
      </span>

      <br />
      <!-- button will activate when allQuestionsAnswered is true -->
      <b-button
        v-on:click="submitAnswers"
        variant="primary"
        class="submitButton"
        style="width: 80%; font-size: 20pt;"
        :disabled="!this.$store.getters.allQuestionsAnswered"
      >Submit</b-button>
    </div>
  </div>
</template>

<script>
import NavBar from "./Navbar.vue";
import QuizQuestion from "./QuizQuestion.vue";

export default {
  name: "QuizPage",
  components: {
    NavBar,
    QuizQuestion
  },
  mounted: function() {
    this.$store.dispatch("quiz_load");
  },
  computed: {
    status: function() {
      return this.$store.state.quiz.status;
    }
  },
  data() {
    return {};
  },
  methods: {
    submitAnswers() {
      // todo
    }
  }
};
</script>


<style scoped>
#loadingText {
  margin-top: 100px;
  font-size: 30pt;
  font-style: bold;
  color: red;
}
</style>