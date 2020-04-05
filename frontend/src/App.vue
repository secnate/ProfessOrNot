<template>
  <div id="app">
    <div v-if="backendOnline">
      <router-view />
    </div>
    <div v-else>Error: {{backendError}}</div>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  computed: {
    backendOnline() {
      return this.$backendOnline;
    },
    backendError() {
      console.log(this.$backendError);
      return this.$backendErr;
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
