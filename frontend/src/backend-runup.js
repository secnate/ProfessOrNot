import axios from "axios";
import store from "./store";

function checkHealth(Vue) {
  return new Promise((resolve, reject) => {
    // Check if backend is online & accessible
    axios({
      url: "/",
      method: "GET",
    })
      .then((resp) => {
        Vue.prototype.$backendOnline = true;
        Vue.prototype.$backendInfo = resp.data;
        console.log("Connected to backend: " + JSON.stringify(resp.data));
        resolve(resp);
      })
      .catch((err) => {
        console.log(err);
        Vue.prototype.$backendOnline = false;
        Vue.prototype.$backendError = err;
        reject(err);
      });
  });
}
function loadUser(Vue) {
  return new Promise((resolve, reject) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      Vue.prototype.$http.defaults.headers.common["Authorization"] =
        "Token " + accessToken;
      store
        .dispatch("fetch_user")
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      resolve();
    }
  });
}

export default function execute(Vue) {
  return Promise.all([checkHealth(Vue), loadUser(Vue)]);
}
