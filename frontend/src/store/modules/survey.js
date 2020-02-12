import axios from "axios";

const state = {
  status: "",
  questions: []
};
const getters = {
  getQuestions: state => state.questions
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
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
