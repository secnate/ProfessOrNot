import Vuex from "vuex";
import Vue from "vue";
import auth from "./modules/auth";
import quiz from "./modules/quiz";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    quiz
  }
});
