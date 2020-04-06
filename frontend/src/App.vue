<template>
  <div id="app">
    <div v-if="backendOnline">
      <b-alert
        class="position-fixed fixed-bottom m-0 rounded-0"
        style="z-index: 2000;"
        variant="info"
        dismissible
        show
      >Established Backend Connection to {{backendURL}} | Deployment: {{backendInfo.deployment}} | Version: {{backendInfo.version}}</b-alert>
      <router-view />
    </div>
    <div v-else>
      <ErrorPage />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ErrorPage from "./components/ErrorPage";
export default {
  name: "app",
  components: {
    ErrorPage
  },
  computed: {
    backendOnline() {
      return this.$backendOnline;
    },
    backendError() {
      console.log(JSON.stringify(this.$backendError));
      return this.$backendError;
    },
    backendInfo() {
      return this.$backendInfo;
    },
    backendURL() {
      console.log(axios);
      return axios.defaults.baseURL;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
