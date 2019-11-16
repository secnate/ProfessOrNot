<template>
    <div>
        <Navbar/>
        <div>
        You're Logged In!
        </div>

        <br/>
        <b-button v-b-modal.review-modal>
            Add A Review
        </b-button>
        
        <!-- Popovers to display -->

        <Review :professorIDProp="0" professorNameProp="" 
                :courseIDProp="0" courseNameProp=""/> 

    </div>

</template>

<script>
import Navbar from "./Navbar.vue"
import Review from "./Review.vue"

export default {
  name: "Main",
  components: {
      Navbar, Review
  },
  data() {
      return {
      }
  },
  methods: {
  }

};
</script>

