import Vuex from "vuex";
import Vue from "vue";
import auth from "./modules/auth";
import survey from "./modules/survey";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    survey
  }
});
