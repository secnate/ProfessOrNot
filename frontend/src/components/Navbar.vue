<template>
<div>
  <b-navbar toggleable="lg" type="dark" variant="info" fixed="top">
    <b-navbar-brand href="#">ProfessOrNot</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <div v-if="showSearchBar">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
        </div>
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
          {{displayName}}
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item v-on:click="logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
    };
  },
  methods: {
        logout: function () {
        this.$store.dispatch('logout')
       .then(() => this.$router.push('/login'))
       .catch(err => alert(err.response))
      }
  },
  props: {
    showSearchBar: Boolean,
  },
  computed: {
    displayName () {
      var user = this.$store.getters.getUser
      if(Object.keys(user).length === 0) {
        this.$store.dispatch('fetch_user')
        user = this.$store.getters.getUser
      }
      return user.name
    }
  }
};
</script>

<style scoped>
</style>