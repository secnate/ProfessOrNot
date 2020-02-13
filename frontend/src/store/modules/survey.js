import axios from "axios";

const state = {
  status: "",
  questions: [],
  responses: []
};
const getters = {
  getQuestions: state => state.questions,
  // {questions, responses} pull them out of state object
  allQuestionsAnswered: ({ questions, responses }) => {
    if (questions.length == responses.length) {
      return true;
    }
    return false;
  }
};
const actions = {
  load_questions({ commit }) {
    return new Promise((resolve, reject) => {
      commit("questions_request");
      axios({
        url: "/debug/testqs",
        method: "GET"
      })
        .then(resp => {
          const payload = resp.data;
          commit("questions_retrieved", payload);
          resolve(resp);
        })
        .catch(err => {
          commit("questions_error");
          reject(err);
        });
    });
  },
  response_selected({ commit }, payload) {
    commit("questions_response", payload);
  }
};
const mutations = {
  questions_request(state) {
    state.status = "loading";
  },
  questions_error(state) {
    state.status = "error";
  },
  questions_retrieved(state, payload) {
    state.status = "retrieved";
    state.questions = payload;
  },
  questions_response(state, payload) {
    // Search through existing responses and if found update selection
    var existingIndex = state.responses.findIndex(
      responses => responses.questionId == payload.questionId
    );
    if (existingIndex != -1) {
      state.responses[existingIndex].responseId = payload.responseId;
    } else {
      // Otherwise push the new selection onto the array
      state.responses.push(payload);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
