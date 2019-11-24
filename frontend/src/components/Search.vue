<template>
  <div>
    <!-- Search Bar -->
    <b-form-input v-model="text" placeholder="Search..."></b-form-input>

    <!-- Displayes Filtered List -->
    <li v-for="(item, index) in filteredProfessors" :key="index">
      <a v-bind:href="item.link" target="_blank">
        {{ item.name }}
      </a>
    </li>
  </div>
</template>

<script>
class professor {
  constructor(name) {
    this.name = name;
    this.link = "www.google.com"; // can update with actual links once professor pages are implemented
  }
}
export default {
  name: "Search",
  components: {},
  data() {
    return {
      text: "",
      // Probably gonna wanna implement the list externally but this is fine for now
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
