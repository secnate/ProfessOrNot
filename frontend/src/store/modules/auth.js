/* eslint-disable no-console */
import axios from "axios";
import router from "../../router";

const state = {
  status: "",
  user: {}
};
const getters = {
  isAuthenticated: state => state.status === "success",
  authStatus: state => state.status,
  getUser: state => state.user
};
const actions = {
  register({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit("auth_request");
      axios({ url: "/auth/register", data: user, method: "POST" })
        .then(resp => {
          const token = resp.data.token;
          const user = resp.data.user;
          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = "Token " + token;
          commit("auth_success", user);
          router.push("/quiz");
          resolve(resp);
        })
        .catch(err => {
          commit("auth_error");
          localStorage.removeItem("token");
          reject(err);
        });
    });
  },
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit("auth_request");
      axios({
        url: "/auth/login",
        data: {
          email: user.email,
          password: user.password
        },
        method: "POST"
      })
        .then(resp => {
          const token = resp.data.token;
          const user = resp.data.user;
          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = "Token " + token;
          commit("auth_success", user);
          if (!user.quiz_complete) {
            router.push("/quiz");
          }
          resolve(resp);
        })
        .catch(err => {
          commit("auth_error");
          localStorage.removeItem("token");
          reject(err);
        });
    });
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit("logout");
      axios({ url: "/auth/logout", method: "POST" })
        .then(resp => {
          commit("logout");
          localStorage.removeItem("token");
          delete axios.defaults.headers.common["Authorization"];
          router.push("/");
          resolve(resp);
        })
        .catch(err => {
          commit("auth_error");
          localStorage.removeItem("token");
          reject(err);
        });
    });
  },
  fetch_user({ commit }) {
    return new Promise((resolve, reject) => {
      axios({ url: "/auth/user", method: "GET" })
        .then(resp => {
          const payload = resp.data;
          commit("update_user", payload);

          resolve(resp);
        })
        .catch(err => {
          commit("auth_error");
          localStorage.removeItem("token");
          delete axios.defaults.headers.common["Authorization"];
          router.push("/");
          reject(err);
        });
    });
  },
  // Issue #115 this is what I implemented
  // Look at the API documentation to see what is submitted and what is returned
  update_user({ commit }, user_updates) {
    return new Promise((resolve, reject) => {
      commit("auth_request");
      axios({ url: "/auth/user", data: user_updates, method: "POST" })
        .then(resp => {
          const payload = resp.data;
          commit("update_user", payload);
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
const mutations = {
  auth_request(state) {
    state.status = "loading";
  },
  auth_success(state, payload) {
    state.status = "success";
    state.user = payload;
  },
  auth_error(state) {
    state.status = "error";
    state.user = "";
  },
  logout(state) {
    state.status = "logout";
    state.user = "";
  },
  update_user(state, payload) {
    state.status = "success";
    state.user = payload;
  },
  set_quiz_complete(state) {
    state.user.quiz_complete = true;
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
