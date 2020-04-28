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
Axios.defaults.baseURL = `https://api.professornot.com`;

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
