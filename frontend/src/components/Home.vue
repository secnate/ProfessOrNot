<template>
  <component :is="appropriateComponent"></component>
</template>

<script>
import Main from "./Main.vue";
import LoginPage from "./LoginPage.vue";

export default {
  name: "AboutUs",
  components: {
    Main,
    LoginPage
  },
  data() {
    return {
      appropriateComponent: this.$store.getters.isAuthenticated
        ? "Main"
        : "LoginPage"
    };
  },
  computed: {
    authStatus() {
      return this.$store.getters.authStatus;
    }
  },
  watch: {
    authStatus(newVal, oldVal) {
      if (newVal === "success") {
        this.appropriateComponent = "Main";
      }
      if (newVal === "logout") {
        this.appropriateComponent = "LoginPage";
      }
      if (newVal === "error") {
        this.appropriateComponent = "LoginPage";
      }
    }
  }
};
</script>