<!--This page asks a user some questions about their preferred learning and class styles-->
<!--For the multiple choice questions, 1-4 represents the first, second, third, and fourth options respectively-->
<!--For the scale question, 1 represents the "strongly disagree case" and 5 represents the "strongly agree" case-->
<!--Questions can be either of type "mc" (multiple choice) or "sc" (scale)-->
<template>
  <div>
    <NavBar/>

    <br/>

    <h1> Learning Style Quiz </h1>

    <div v-show="!can_display">
      <h1 id="loadingText"> Loading Questions... </h1>
      <b-spinner 
          label="Loading Questions..." variant="primary" type="grow" 
           style="width: 3rem; height: 3rem;">
      </b-spinner>
    </div>

    <div v-show="can_display">
      <span v-for="questionObj in this.questions_to_display" v-bind:key="questionObj.id">

      <div v-if='questionObj.type=="mc"'>
        <MCQuizQuestion 
          :questionId="questionObj.id"
          :choicesArray="questionObj.choices" 
          :question="questionObj.text"
        />
      </div>

      <!--The Scale Question goes from 1 through 5, strongly disagree to strongly agree-->
      <div v-if='questionObj.type=="sc"'>
        <ScaleQuizQuestion 
          :questionId="questionObj.id"
          :question="questionObj.text"
        />
      </div>

      </span>

      <br/>
        <b-button v-on:click="submitAnswers" 
              variant="primary" 
              className="submitButton"
              style="width: 80%; font-size: 20pt;"
        >
        Submit
    </b-button>
    </div>

    

  </div>

</template>

<script>

import NavBar from "./Navbar.vue";
import MCQuizQuestion from "./MCQuizQuestion.vue";
import ScaleQuizQuestion from "./ScaleQuizQuestion.vue";

export default {
  name: "SurveyPage",
  components: {
    NavBar,
    MCQuizQuestion,
    ScaleQuizQuestion
  },
  mounted: function() {
    console.log("Entered and mounted SurveyPage. Generating the array of user responses.");

    this.$store.dispatch('get_questions_from_backend');
  },
  computed: {
    can_display: function() {
      var toReturn = this.$store.state.question_status == "success";
      console.log("DEBUG: the can_display return value is: " + toReturn)
      return toReturn;
    },
    questions_to_display: function() {
      return this.$store.state.questions_to_answer;
    },
    all_question_responses: function() {
      return this.$store.state.question_responses;
    }
  },
  data() {
    return {
    };
  },
  methods: {
    submitAnswers() {
      // first, we check if all the questions have been answered  
      if (!this.allQuestionsAnswered()) {
        // we launch a toaster to notify the user that they need to answer all questions 
        this.$bvToast.toast('You Did Not Answer All Questions', {
                title: 'Form Incomplete',
                variant: 'warning',
                solid: true,
                toaster:'b-toaster-top-full'
        })
      } 
      else {
        // submit the data to the backend
        console.log("DEBUG: we are sending the answers to the backend.");
        console.log("DEBUG: sending: " + JSON.stringify(this.user_selections));
        console.log("DEBUG: for future notice: the user will need to be redirected after the form is submitted.");
        alert("Check the printout console.");
      }
    },
    allQuestionsAnswered() {
      var i = 0;
      for ( i = 0; i < this.all_question_responses.length; i++) {
        if (this.all_question_responses[i].choice == -1) {
          return false;
        }
      }

      return true;
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