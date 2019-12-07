  
<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary" fixed="top">
	<div class="container">
	<b-navbar-brand to="/" left><img src="../assets/logotitle.svg" width="300" alt="bb"></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>{{ getUser.name }}</template>
            <b-dropdown-item v-b-modal.profile-modal>Profile</b-dropdown-item>
            <b-dropdown-item v-on:click="logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
</div>
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
  },
  methods: {
    logout: function() {
      this.$store
        .dispatch("logout")
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

<style scoped>
.b_navbar{
	background_color: "black";
}
</style>
