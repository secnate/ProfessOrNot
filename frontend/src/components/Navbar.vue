<template>
  <div id="entire-navbar">
    <b-navbar toggleable="lg" type="dark" variant="info" fixed="top">

      <!-- The href being '/' allows for someone to click the text and go back to the homepage -->
      <b-navbar-brand href="/" left>ProfessOrNot</b-navbar-brand>



      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <Search class="mr-sm-2" />
        <b-navbar-nav class="ml-auto">
          <div v-if="showSearchBar">
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>
          </div>
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>{{ getUser.name }}</template>
            <b-dropdown-item v-b-modal.my-modal>Profile</b-dropdown-item>
            <b-dropdown-item v-on:click="logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <Profile />
  </div>
</template>

<script>
import Profile from "./Profile";
import Search from "./Search";
import { mapGetters } from "vuex";

export default {
  name: "Navbar",
  components: {
    Profile,
    Search
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

<style scoped></style>
