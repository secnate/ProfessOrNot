/* eslint-disable no-console */
import axios from "axios";
import router from "../../router";

const state = {
  status: "",
  token: localStorage.getItem("token") || "",
  user: {}
};
const getters = {
  isAuthenticated: state => !!state.token,
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
          const payload = [token, user];
          commit("auth_success", payload);
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
          const payload = [token, user];
          commit("auth_success", payload);
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
          router.push("/login");
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
          router.push("/login");
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
    state.token = payload[0];
    state.user = payload[1];
  },
  auth_error(state) {
    state.status = "error";
    state.token = "";
    state.user = "";
  },
  logout(state) {
    state.status = "";
    state.token = "";
    state.user = "";
  },
  update_user(state, payload) {
    state.token = localStorage.getItem("token");
    state.status = "success";
    state.user = payload;
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
