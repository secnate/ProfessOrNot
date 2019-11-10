<template>
    <div>
        <Navbar/>
        <div>
        You're Logged In!
        </div>

        <br/>
        <b-button v-b-modal.new-prof-modal>
            Add New Professor
        </b-button>
        <b-button v-b-modal.new-course-modal>
            Add New Course
        </b-button>
        <b-button v-b-modal.review-modal>
            Add A Review
        </b-button>
        
        <!-- Popovers to display -->
        <NewProf/>
        <NewCourse/>

        <Review /> 

    </div>

</template>

<script>
import Navbar from "./Navbar.vue"
import NewProf from "./NewProf.vue"
import NewCourse from "./NewCourse.vue"
import Review from "./Review.vue"

export default {
  name: "Main",
  components: {
      Navbar, NewProf, NewCourse, Review
  },
  data() {
      return {
      }
  },
  methods: {
  }

};
</script>

