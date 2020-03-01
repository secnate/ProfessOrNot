import axios from "axios";
import router from "./router";
import store from "./store";

axios.interceptors.response.use(
  response => {
    return response;
  },
  function(error) {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      console.log("401 Error");
      localStorage.removeItem("token");
      store.commit("auth_error");
      router.push("/login");
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
