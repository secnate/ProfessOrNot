<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" fixed="top">
      <b-navbar-brand to="/" left>ProfessOrNot</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <div v-if="showSearchBar">
            <b-nav-form>
              <b-form-input size="sm" class="" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>
          </div>
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>{{getUser.name}}</template>
            <b-dropdown-item v-b-modal.profile-modal>Profile</b-dropdown-item>
            <b-dropdown-item v-on:click="logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <Profile />
  </div>
</template>

<script>
/* eslint-disable no-console */
import Profile from "./Profile"
import { mapGetters } from 'vuex'
export default {
  name: "Navbar",
  components: {
    Profile
  },
  methods: {
    logout: function() {
      this.$store
        .dispatch("logout")
        .catch(err => alert(err.response));
    },
  },
  props: {
    showSearchBar: Boolean,
  },
  computed: {
    ...mapGetters(['getUser'])
  }
};
</script>

<style scoped>
</style>