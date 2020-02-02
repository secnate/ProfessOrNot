<!--This page asks a user some questions about their preferred learning and class styles-->
<!--For the multiple choice questions, 1-4 represents the first, second, third, and fourth options respectively-->
<!--For the scale question, 1 represents the "strongly disagree case" and 5 represents the "strongly agree" case-->
<!--Questions can be either of type "mc" (multiple choice) or "sc" (scale)-->
<template>
  <div>
    <NavBar/>

    <br/>

    <h1> Learning Style Quiz </h1>

    <span v-for="questionObj in this.questions" v-bind:key="questionObj.id">

      <div v-if='questionObj.type=="mc"'>
        <MCQuizQuestion 
          :questionId="questionObj.id"
          :choicesArray="questionObj.choices" 
          :question="questionObj.text"
          v-on:updateChoices="handleUpdateChoices"
        />
      </div>

      <!--The Scale Question goes from 1 through 5, strongly disagree to strongly agree-->
      <div v-if='questionObj.type=="sc"'>
        <ScaleQuizQuestion 
          :questionId="questionObj.id"
          :question="questionObj.text"
          v-on:updateChoices="handleUpdateChoices"
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

    // creating an empty thing
    this.user_selections = [];
    for (var i = 0; i < this.questions.length; i++) {
      this.user_selections.push( {id: this.questions[i].id, choice: -1} ); // -1 is an invalid value
    }
  },
  data() {
    return {
      // a complete array representing the questions involved.
      // questions can be either of type "mc" (multiple choice) or "sc" (scale)
      // If the question is a scale, we do not have any choices to give because
      // they all range from 1 (strongly disagree) to 5 (strongly agree)
      questions: [
        {
          id: 1, type: "mc", text: "The Most Important Quality In A Professor To Me Is", 
          choices: [
            {id: 1, text: "No Homework"},
            {id: 2, text: "No Class"},
            {id: 3, text: "Hands-On Projects"},
            {id: 4, text: "No Papers"}
          ]
        },
        {
          id: 2, type: "sc", text: "I Like A Professor Who Gives Easy A's"
        },
        {
          id: 3, type: "mc", text: "My Preferred Learning Style Is", 
          choices: [
            {id: 1, text: "Hands-On"},
            {id: 2, text: "Visual"},
            {id: 3, text: "Audio"},
            {id: 4, text: "Lecture"}
          ]
        },
        {
          id: 4, type: "sc", text: "The Stricter The Professor Is, The Better"
        }
      ],
      // this is all that the user has selected
      // each position in the array corresponds to the question in the questions array
      user_selections: []
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
      for (var i = 0; i < this.user_selections.length; i++) {
        if (this.user_selections[i].choice == -1) {
          return false;
        }
      }
      return true;
    },
    handleUpdateChoices(data) {

      // due to technical reasons, the data is passed in the 
      // format of "#:#", where the first number represents 
      // the question id and the second represents the selected index
      // extract them for further processing
      var splitArray = data.split(':');

      var question_id = JSON.parse(splitArray[0]);
      var selected_index = JSON.parse(splitArray[1]);

      if (this.user_selections.length != 0) {

        for (var i = 0; i < this.user_selections.length; i++) {
          if (this.user_selections[i].id == question_id) {
            this.user_selections[i].choice = selected_index;

            break; // I assume only one user for each index
          }
        }
      }
     
    }
  }
};
</script>


<style scoped>

</style>