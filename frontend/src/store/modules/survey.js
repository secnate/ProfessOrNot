import axios from "axios";
import router from "../../router";

const state = {
  status: "",
  questions: []
};
const getters = {};
const actions = {
  load_questions({ commit }) {
    return new Promise((resolve, reject) => {
      commit("auth_request");
      axios({
        url:
          "https://gist.githubusercontent.com/willbootle/4026f0d30e9c9f6509c1aa3f506d52e3/raw/b656965120212353b6d8b6ee7a9157ffaebeba17/qs.txt",
        data: user,
        method: "POST"
      })
        .then(resp => {
          const payload = resp.data;
          commit("questions_retrieved", payload);
          resolve(resp);
        })
        .catch(err => {
          commit("auth_error");
          localStorage.removeItem("token");
          reject(err);
        });
    });
  }
};
const mutations = {
  questions_request(state) {
    state.status = "loading";
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
