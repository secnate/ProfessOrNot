import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import router from "./router";
import store from "./store";
import Axios from "axios";
import "./axios-intercept";
import backendRunup from "./backend-runup";
import vSelect, { VueSelect } from "vue-select";
import "vue-select/dist/vue-select.css";

// Vue settings
Vue.config.productionTip = false;
Vue.prototype.$http = Axios;

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.component("v-select", vSelect);

// Axios Setup
// Set base url (the api server)
if (process.env.NODE_ENV === "production") {
  require("axios-base-url")("https://dev-api.professornot.com");
} else {
  //require("axios-base-url")("https://dev-api.professornot.com");

  //This line needs to be uncommented and the other needs to be commented
  require("axios-base-url")("http://localhost:8000");
}
backendRunup(Vue).then(() => mountRoot());
// Mount the main vue object (event bus)
function mountRoot() {
  var EventBus = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
}
// Initialize imported components
export default async () => EventBus;
