
<template>
  <div>
    <div v-if="$store.getters.isAuthenticated">
      <Navbar />
    </div>
    <div v-else>
      <b-navbar toggleable="lg" type="dark" variant="primary" fixed="top" ref="nav_bar">
      <b-navbar-brand to="/" class="pl-4">
        <img src="../assets/logotitle.svg" margin-left="10" alt="bb" width="300" />
      </b-navbar-brand>
      </b-navbar>
    </div>
    <br/>

    <h1 class="contact_title"> Contact Us </h1>
    <br/>

    <b-container>
      <b-row>
        <h2 class="contact_body"> 
          If you have any feedback, issues, or concerns, we want to hear from you.
        </h2>
      </b-row>

      <b-row>
        <h2 class="contact_body">
          You can reach us at the following:
        </h2>
      </b-row>
      
      <br/>

      <b-row>
        <b-col cols="2">
          <b-icon icon="envelope-fill" font-scale="3"/>
        </b-col>
        <b-col>
          <h2 class="contact_body"> 
            <b>Mailing Address:</b> To Be Determined
          </h2>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="2">
          <b-icon icon="at" font-scale="3"/>
        </b-col>
        <b-col>
          <h2 class="contact_body"> 
            <b>Email Address:</b> To Be Determined
          </h2>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="2">
          <b-icon icon="phone" font-scale="3"/>
        </b-col>
        <b-col>
          <h2 class="contact_body"> 
            <b>Phone Number:</b> To Be Determined
          </h2>
        </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>
import Navbar from "./Navbar.vue";

export default {
  name: "ContactPage",
  components: {
    Navbar
  },
  mounted: function() {
  },
  computed: {
  },
  data() {
    return {};
  },
  methods: {
  }
};

</script>


<style scoped>

.contact_title {
  font-size: 30pt;
  font-weight: bold;
  text-decoration: underline;
}

.contact_body {
  text-align: left;
  margin-left: 50px;
  margin-right: 50px;
}

</style>