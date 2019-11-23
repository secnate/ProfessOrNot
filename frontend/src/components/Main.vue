<template>
  <div>
    <Navbar />
    <div>You're Logged In!</div>
    <div>
      <!-- Search Bar -->
      <b-form-input v-model="text" placeholder="Search..."></b-form-input>

      <!-- Displays Filtered List-->
      <li v-for="(item, index) in filteredProfessors" :key="index">{{ item.name }}</li>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import Review from "./Review.vue";

class professor {
  constructor(name) {
    this.name = name;
  }
}

export default {
  name: "Main",
  components: {
    Navbar,
    Review
  },
  data() {
    return {
      text: "",
      // Could easily change this to a class
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
