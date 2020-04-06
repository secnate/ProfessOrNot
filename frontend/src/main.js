import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import router from "./router";
import store from "./store";
import Axios from "axios";
import intercept from "./axios-intercept";
import backendRunup from "./backend-runup";
import vSelect, { VueSelect } from "vue-select";
import "vue-select/dist/vue-select.css";

// Vue settings
Vue.config.productionTip = false;
Vue.prototype.$http = Axios;
if (process.env.NODE_ENV === "production") {
  Axios.defaults.baseURL = `"https://dev-api.professornot.com"`;
} else {
  //Axios.defaults.baseURL = `"https://dev-api.professornot.com"`;

  //This line needs to be uncommented and the other needs to be commented
  Axios.defaults.baseURL = `http://localhost:8000`;
}

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.component("v-select", vSelect);

backendRunup(Vue)
  .then(() => mountRoot())
  .catch(() => mountRoot());
// Mount the main vue object (event bus)
function mountRoot() {
  var EventBus = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
  intercept();
}
// Initialize imported components
export default async () => EventBus;
