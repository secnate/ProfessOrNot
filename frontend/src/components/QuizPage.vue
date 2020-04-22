<!--This page asks a user some questions about their preferred learning and class styles-->
<!--For the multiple choice questions, 1-4 represents the first, second, third, and fourth options respectively-->
<!--For the scale question, 1 represents the "strongly disagree case" and 5 represents the "strongly agree" case-->
<!--Questions can be either of type "mc" (multiple choice) or "sc" (scale)-->
<template>
  <div>
    <NavBar />

    <br />

    <h1 class="quiz_title">Learning Style Quiz</h1>
    <div v-if="status == 'load error'">Error retrieveing questions from server</div>

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
        <QuizQuestion :question="questionObj" />
      </span>

      <br />
      <!-- button will activate when allQuestionsAnswered is true -->
      <div id="submit-button-div">
      <b-button
        @click="submitAnswers"
        variant="primary"
        class="submitButton"
        style="width: 80%; font-size: 20pt; margin-bottom:20px;"
        :disabled="!this.$store.getters.allQuestionsAnswered"
      >Submit</b-button>
      </div>
      <b-tooltip v-if="!this.$store.getters.allQuestionsAnswered" target="submit-button-div" placement="top" @shown="$store.commit('quiz_show_unanswered')">Please answer all questions.</b-tooltip>
    </div>

    <!-- Results of submission -->
    <div v-if="status == 'submitting'">
      <!-- This is a circulating spinner -->
      <b-spinner
        variant="success"
        type="grow"
        style="margin-top: 150px; width: 55px; height: 55px; color: #7ac142;"
      />
    </div>
    <div v-if="status == 'submit error'">
      <h1>Error Submitting to Server.</h1>
    </div>
    <div v-if="status == 'submitted'">
      <!-- Filling in the circular spinner when submission is successful -->
      <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
        <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
        <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
      </svg>
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
      this.$store.dispatch("quiz_submit");
    }
  },
  created: function() {
    // When this component is created, I use a subscripton to vuex
    // so that I can monitor when the quiz is finally submitted and
    // can transfer the user to the homepage.
    // The created function is called each time I am entering this page,
    // so we set the appropriate lifecycle hooks to listen for lifecycle changes
    //
    // the const unsubscribe is the unsubscribing function returned by the
    // subscribe function. This allows us to stop listening when needed
    const unsubscribe = this.$store.subscribe((mutation, state) => {
      if (
        mutation.type === "set_quiz_complete" &&
        this.status === "submitted"
      ) {
        unsubscribe(); // we are leaving the page, so don't need to listen anymore

        // we now wait 1.5 seconds before redirecting the user to the home page
        setTimeout(() => {
          this.$router.push("/");
        }, 2000);
      }
    });
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

.quiz_title {
  font-size: 35pt;
  font-style: bold;
}

/* The following refers to the circle loader with checkmark CSS animation */
.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #7ac142;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #fff;
  stroke-miterlimit: 10;
  margin: 10% auto;
  box-shadow: inset 0px 0px 0px #7ac142;
  animation: fill 0.4s ease-in-out 0.4s forwards,
    scale 0.3s ease-in-out 0.9s both;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes scale {
  0%,
  100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}
@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 30px #7ac142;
  }
}
</style>