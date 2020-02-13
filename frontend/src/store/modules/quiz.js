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
  quiz_load({ commit }) {
    return new Promise((resolve, reject) => {
      commit("quiz_request");
      axios({
        url: "/debug/testqs",
        method: "GET"
      })
        .then(resp => {
          const payload = resp.data;
          commit("quiz_retrieved", payload);
          resolve(resp);
        })
        .catch(err => {
          commit("quiz_error");
          reject(err);
        });
    });
  },
  quiz_selection({ commit }, payload) {
    commit("quiz_response", payload);
  }
};
const mutations = {
  quiz_request(state) {
    state.status = "loading";
    // Clear response array on quiz_request to prevent lingering answers from incomplete survey.
    state.responses = [];
  },
  quiz_error(state) {
    state.status = "error";
  },
  quiz_retrieved(state, payload) {
    state.status = "retrieved";
    state.questions = payload;
  },
  quiz_response(state, payload) {
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
