import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import  router  from  './router'
import  store  from  './store'
import  Axios  from  'axios'

require('axios-base-url')('https://dev-api.professornot.com');
Vue.config.productionTip = false
Vue.prototype.$http  =  Axios;
const accessToken  =  localStorage.getItem('token')

if (accessToken) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] =  "Token " + accessToken
}
Vue.use(BootstrapVue)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
