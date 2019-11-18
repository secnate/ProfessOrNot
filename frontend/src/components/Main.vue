<template>
  <div>
    <Navbar />
    <div>You're Logged In!</div>
    <div>
      <b-form-input v-model="text" placeholder="Enter your name"></b-form-input>
      <div class="mt-2">Value: {{ text }}</div>
      <p>{{filteredLit}}</p>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";

export default {
  name: "Main",
  components: {
    Navbar
  },
  data() {
    return {
      text: "",
      List: [
        "Duncan Buell",
        "Veronica Wilson",
        "James O'Rieley",
        "John Doe",
        "Test Professor1",
        "Test Professor2"
      ]
    };
  },
  methods: {
    filteredList() {
      return this.List.filter(List => {
        return List.toLowerCase().includes(this.text.toLowerCase());
      });
    }
  }
};
</script>