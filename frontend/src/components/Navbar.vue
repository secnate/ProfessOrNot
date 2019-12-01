<template>
  <div id="entire-navbar">
    <b-navbar toggleable="lg" type="dark" variant="info" fixed="top">

      <!-- The href being '/' allows for someone to click the text and go back to the homepage -->
      <b-navbar-brand href="/" left>ProfessOrNot</b-navbar-brand>



      <b-navbar-toggle target="nav-collapse" class="no-border"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav class="no-border">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto no-border">
          <b-nav-item-dropdown class="no-border" right>
            <!-- Using 'button-content' slot -->
            <template class="no-border" v-slot:button-content>{{ getUser.name }}</template>
            <b-dropdown-item class="no-border" v-b-modal.my-modal>Profile</b-dropdown-item>
            <b-dropdown-item class="no-border" v-on:click="logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <Profile />
  </div>
</template>

<script>
import Profile from "./Profile";
import { mapGetters } from "vuex";

export default {
  name: "Navbar",
  components: {
    Profile
  },
  methods: {
    logout: function() {
      this.$store
        .dispatch("logout")
        .then(() => this.$router.push("/login"))
        .catch(err => alert(err.response));
    }
  },
  props: {
    showSearchBar: Boolean
  },
  computed: {
    ...mapGetters(["getUser"])
  }
};
</script>

<style style>
.no-border {
  border: none;
}
</style>
