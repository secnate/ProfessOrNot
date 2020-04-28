<template>
  <div class="errcard">
    <b-card
      img-src="../assets/logotitle_2.svg"
      img-alt="Image"
      img-topb
      style="padding: 20px; min-width: 500px; max-width: 500px;"
      class="mb-3 bg- text-primary"
    >
      <b-icon icon="x-circle-fill" style="width: 60px; height: 60px;" variant="danger"></b-icon>
      <br />Network Connection To Server Could Not Be Established!
      <br />
      Server URL: {{backendURL}}
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ErrorPage",
  components: {},
  methods: {},
  computed: {
    backendError() {
      return this.$backendError;
    },
    backendURL() {
      console.log(axios);
      return axios.defaults.baseURL;
    }
  }
};
</script>

<style scoped>
.errcard {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
}
</style>