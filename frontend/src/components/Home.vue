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
  computed: {
    appropriateComponent() {
      return this.$store.getters.isAuthenticated ? "Main" : "LoginPage";
    }
  }
};
</script>