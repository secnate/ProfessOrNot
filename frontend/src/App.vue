<template>
  <div id="app">
    <div v-if="backendOnline">
      <b-alert
        class="position-fixed fixed-bottom m-0 rounded-0"
        style="z-index: 2000;"
        :variant="alertColor"
        dismissible
        show
        v-if="devMode"
      >
        Connected to API
        <b-icon-cloud />
        URL: {{backendURL}} | Deployment Mode: {{backendInfo.deployment}} | Version: {{backendInfo.version}}
      </b-alert>
      <!-- Enter the application (router) -->
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
    devMode() {
      if(process.env.NODE_ENV !== "production"){
        return true;
      }
      return false;
    },
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
    },
    alertColor() {
      if (this.$backendInfo.deployment === "local") {
        return "danger";
      }
      return "info";
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
