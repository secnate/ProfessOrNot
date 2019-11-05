<template>
    <div>
        <Navbar/>
        <div>
        You're Logged In!
        </div>
    </div>
</template>

<script>
import Navbar from "./Navbar.vue"
export default {
  name: "Main",
  components: {
      Navbar,
  },
  data() {
      return {
      }
  },
  methods: {
  }

};
</script>