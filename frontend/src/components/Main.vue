<template>
    <div>
        <Navbar/>
        <div>
        You're Logged In!
        </div>

        <Search />

    </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import Search from "./Search.vue";

export default {
  name: "Main",
  components: {
    Navbar,
    Search
  },
  data() {
    return {};
  },
  methods: {},
  computed: {}
};
</script>
