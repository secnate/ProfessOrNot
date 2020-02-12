/* eslint-disable no-console */
import axios from "axios";  // we use it to query the backend

// Vuex will be storing the questions from the axios server themselves
// and will also store the user responses

///////////////////////////////////////////////////////////////////////////

// Helper functions

function getQuestionsArray() {
  // returns the array containing the original questions as well as all answer options
  var result = localStorage.getItem('questions_array');
  if (result == null) {
    return []; // empty array
  }
  else {
    return JSON.parse(result);  // we convert from string array representation to object
  }
}

function getQuestionsResponses() {
  // returns the array containing the answers that the user gave
  var result = localStorage.getItem('questions_responses');
  if (result == null) {
    return []; // empty array
  }
  else {
    return JSON.parse(result);  // we convert from string array representation to object
  }
}

function saveQuestionsArray() {
  // takes the question array and saves it 
  if (state.questions_array != null) {
    localStorage.setItem('questions_array', JSON.stringify(state.questions_array));
  }
}

function saveQuestionResponses() {
  // takes the question responses array and saves it
  if (state.question_responses != null) {
    localStorage.setItem('questions_responses', JSON.stringify(state.question_responses));
  }
}

///////////////////////////////////////////////////////////////////////////

const state = {
  question_status: "",
  questions_array: getQuestionsArray(),
  question_responses: getQuestionsResponses()
};

const getters = {
  question_status: state => state.question_status,
  questions_to_answer: state => state.questions_array,
  question_responses: state => state.question_responses
};

/////////////////////////////////////////////////////////////////////////////////
// the actions invoke the mutators to get something done
const actions = {

  set_user_answer({commit}, payload) {
    // payload contains the question_id and the answer_index of the question we want to answer
    commit('update_answer', payload);
  },
  clear_arrays({commit}) {
    commit('clear_all_arrays')
  },
  get_questions_from_backend({commit}) {
    // TODO -- call with axios to get backend
    console.log("DEBUG: Getting Questions From The Backend");
    var result_from_backend = [
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
    ];

    // now that we finished calling the backend and got the result, save it
    console.log("\tDEBUG: the result_from_backend is: " + JSON.stringify(result_from_backend));
    commit('set_new_questions', result_from_backend);
    commit('question_receipt_success');
  }

};

/////////////////////////////////////////////////////////////////////////////////
// mutators update the state in the vuex store
// the actions commit the mutators --> meanining that they launch the handlers

/////////////////////////////////////////////////////////////////////////////////
// first we do mutations. we want the following capabilities
// 1. Update the user's answer for a given question
// 2. Set new questions_array, meanining that we create new question_responses array
// 3. Refresh -- meanining clear both questions_array and question_responses
// 4. Loading Question from backend
// 5. Question receipt success, meanining that we got the questions from the backend successfully
// 6. Question receipt error, meanining that we got some error when querying question from backend

const mutations = {

  update_answer(state, payload) {
    // we have a user giving a definitive answer for a given question with id
    // I that the question_responses array is initialized and we can work with it
    // 
    // payload is an object containing both question_id and answer_index
    var question_id = payload.question_id;
    var answer_index = answer_index;

    console.log("DEBUG: in update_answer mutation");
    console.log("DEBUG: the question_id is: " + question_id + 
                " and answer_index is: " + answer_index);

    if (state.question_responses.length != 0) {

      // iterate over the question_responses array and find the question with the question_id
      for (var i = 0; i < state.question_responses.length; i++) {
        if (state.question_responses[i].id == question_id) {
          state.question_responses[i].choice = selected_index;

          break; // I assume only one user for each index
        }
      } 

      // now we save the changes
      saveQuestionResponses();
    }
  },
  set_new_questions(state, new_array) {
    // I assume that the new_array is legit
    state.questions_array = new_array;
    saveQuestionsArray();

    // now I create the new question_responses
    state.question_responses = [];
    
    for (var i = 0; i < new_array.length; i++) {
      state.question_responses.push( {id: new_array[i].id, choice: -1} ); // -1 is an invalid value
    }

    // now I save the changes
    saveQuestionResponses();

    console.log("DEBUG: in set_new_questions function");
    console.log("\tDEBUG: state.questions_array is now: " + JSON.stringify(state.questions_array));
    console.log("\tDEBUG: state.question_responses is now: " + JSON.stringify(state.question_responses));
  },
  clear_all_arrays(state) {
    state.questions_array = [];
    state.question_responses = [];

    saveQuestionsArray();
    saveQuestionResponses();
  },
  question_backend_querying(state) {
    state.question_status = "loading";
  },
  question_receipt_success(state) {
    console.log("DEBUG: in question_receipt_success");
    state.question_status = "success";
    console.log("\tDEBUG: after task, the state.question_status is: " + state.question_status);
  },
  question_receipt_error(state) {
    state.question_status = "error";
  }

};


export default {
  state, 
  getters, 
  mutations,
  actions
};