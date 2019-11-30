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
        

        <!-- Buttons to test going to next page -->
        <br/><br/>
        <router-link :to="{name: 'professor', query: {profId: 4} }">
            <b-button>
            Go To Professor Page
            </b-button>
        </router-link>

        <br/> <br/>
        <router-link :to="{name: 'course', query: {courseId : 3 }}">
            <b-button>
            Go To Course Page
            </b-button>
        </router-link>

        <!-- Popovers to display -->

        <Review :professorIDProp="0" professorNameProp="" 
                :courseIDProp="0" courseNameProp=""/> 

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
