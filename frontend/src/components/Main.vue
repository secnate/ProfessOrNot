<template>
  <div>
    <Navbar />
    <div>You're Logged In!</div>
    <Search />
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import Search from "./Search.vue";
//import Review from "./Review.vue";

export default {
  name: "Main",
  components: {
    Navbar,
    Search
    // Review
  },
  data() {
    return {};
  },
  methods: {},
  computed: {}
};
</script>
