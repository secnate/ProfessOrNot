import Vue from "vue";
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import router from "./router";
import store from "./store";
import Axios from "axios";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

if (process.env.NODE_ENV === "production") {
  require("axios-base-url")("https://dev-api.professornot.com");
} else {
  //require("axios-base-url")("https://dev-api.professornot.com");

  //This line needs to be uncommented and the other needs to be commented
  require("axios-base-url")("http://localhost:8000");
}
Vue.config.productionTip = false;
Vue.prototype.$http = Axios;
const accessToken = localStorage.getItem("token");

if (accessToken) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] =
    "Token " + accessToken;
}
// If token is present but user object is not, fetch the user
if (store.getters.isAuthenticated && !store.getters.getUser.name) {
  store.dispatch("fetch_user");
}
Vue.use(BootstrapVue);
Vue.component("v-select", vSelect);
var EventBus = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

export default EventBus;
