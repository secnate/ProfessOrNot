  
<template>
<div>
  <b-navbar toggleable="lg" type="dark" variant="primary" fixed="top">

    <b-navbar-brand to = "/" class="pl-4">
    <img src = "../assets/logotitle.svg"  margin-left= "10" alt="bb" width="300">
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse">

    </b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right class="pr-4">
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>{{getUser.name}}</template>
          <b-dropdown-item v-b-modal.profile-modal>Profile</b-dropdown-item>
          <b-dropdown-item @click="openMyReviews">My Reviews</b-dropdown-item>
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
import router from "../router.js";
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
    },
    openMyReviews : function() {
      // if we are not on the myreviews page, go to it, otherwise, no reaction
      if (this.$route.name != "myreviews")
      {
        router.push({path: "/myreviews"});
      }
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
.pictureAlign {
  float: left;
}
/* .app {
  text-align: left;
} */
/* .b_navbar{
	background_color: "black";
} */
/* .b-navbar-brand {
  padding-left:100%;
} */
.alignleft {
  text-align: left;
}
</style>
