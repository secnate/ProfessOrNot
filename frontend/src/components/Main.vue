<template>
  <div>
    <Navbar />
    <div>You're Logged In!</div>
    <div>
      <!-- Search Bar -->
      <b-form-input v-model="text" placeholder="Search..."></b-form-input>

      <!-- Displays Filtered List-->
      <li v-for="(item, index) in filteredProfessors" :key="index">
        <a v-bind:href="item.link" target="_blank">
          {{ item.name }}
        </a>
      </li>
    </div>
    <!-- <Dropdown
      :options="[
        { id: 1, name: 'Option 1' },
        { id: 2, name: 'Option 2' }
      ]"
      v-on:selected="validateSelection"
      v-on:filter="getDropdownValues"
      :disabled="false"
      name="zipcode"
      :maxItem="10"
      placeholder="Please select an option"
    >
    </Dropdown> -->
  </div>
</template>

<script
  type="text/javascript"
  src="node_modules/vuejs/dist/vue.min.js"
></script>
<script
  type="text/javascript"
  src="node_modules/vue-simple-search-dropdown/dist/vue-simple-search-dropdown.min.js"
></script>
<script type="text/javascript">
Vue.use(Dropdown);
</script>

<script>
import Navbar from "./Navbar.vue";
//import Review from "./Review.vue";
import Dropdown from "vue-simple-search-dropdown";

//Vue.use(Dropdown);
class professor {
  constructor(name) {
    this.name = name;
    this.link = "www.google.com"; // can update with actual links once professor pages are implemented
  }
}

export default {
  name: "Main",
  components: {
    Navbar
    // Review
  },
  data() {
    return {
      text: "",
      professors: [
        new professor("John Doe"),
        new professor("Bill Burr"),
        new professor("Test professor")
      ]
    };
  },
  methods: {},
  computed: {
    filteredProfessors() {
      if (this.text.length >= 2) {
        return this.professors.filter(professor => {
          return professor.name.toLowerCase().includes(this.text.toLowerCase());
        });
      }
      return null;
    }
  }
};
</script>
