<template>
    <div>
        <Navbar/>
        <h1>
            <b-img src="../assets/logotitle.png" class="titleImage"/>
        </h1>

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

<style>
.titleImage {
    margin: 0 auto;
    width: 80%;
}
</style>
