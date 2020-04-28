<template>


  <div class="card" :key="review.id+0">
    <div class="card-text" :key="review.id+1">
      <div class="card-text" :key="review.id+2">
        <div class="card-header">

          <b-container>
            <b-row>

              <b-col cols="1">
              </b-col>

              <b-col sm="">
                <p class="review_prof_name" v-if="!hideProfessorName">
                  <b>Professor: </b>

                  <router-link :to="{name: 'professor', params: {id : review.id }}">
                    <b>{{ review.name }}</b>
                  </router-link>
                </p>
                <p class="review_course_name" v-if="!hideCourseName">
                  <b>Course: </b>

                  <router-link :to="{name: 'course', params: {id : review.id }}">
                    <b>{{ review.name }}</b>
                  </router-link>
                </p>

                <!-- If avg_rating is null, class has no reviews -->
                <h2 class="rating_string" v-if="review.avg_rating != null">
                  Average Ranking: 
                  <StarRating v-model="review.avg_rating" v-bind:star-size="30" v-bind:read-only="true"/>
                </h2>
                <h2 class="rating_string" v-else>
                  Hasn't Been Reviewed Yet
                </h2>

              </b-col>

            </b-row>
          </b-container>

        </div>
      </div>
    </div>

  </div>

</template>


<script>
import axios from "axios";                  // used to communicate with backend database
import StarRating from "vue-star-rating";

export default {
  name: "CourseProfSummary",
  methods: {
    convertDateStringToDateRepresentation(date_str) {
      var dateObj = new Date(date_str);
      return dateObj.toLocaleDateString("en-US");
    },
  },
  props: {
    hideProfessorName: Boolean,
    hideCourseName: Boolean,
    review: Object
  },
  computed: {
    similarity_style: function() {
      // This returns the style that corresponds to the similarity percentage
      if (this.review.similarity_score != null) {
        if (0 <= this.review.similarity_score && this.review.similarity_score <= 33) {
          return {
            'background-color': '#ff8080', // red
            'border-radius': '10px'
          };
        }
        else if (34 <= this.review.similarity_score && this.review.similarity_score <= 66) {
          return {
            'background-color': '#ffb366', // orange
            'border-radius': '10px'
          };
        } else {
          // 67% to 100%
          return {
            'background-color': '#70db70', // green
            'border-radius': '10px'
          };
        }
      } 
      else {
        return {
            'background-color': '#000000', // black
            'border-radius': '10px'
        };
      }
    }
  },
  data() {
    return {
    };
  },
  components: {
    StarRating
  }
};
</script>
<style scoped>

.card {
  margin-top: 15px;
}

.professorTitle {
  font-size: 40pt;
}

.professorInfoBody {
  background-color: none;
}

.review_box {
  align: center;
  width: 75%;
  border-color: 2px primary solid;
}

.review_comment {
  font-size: 15pt;
  width: 100%;
  background-color: none;
  text-align: left;
  margin-left: 10px;
  margin-top: 5px;
}

.date_string {
  font-size: 14pt;
  margin-left: 3px;
  text-align: right;
}

.makeNewReview {
  color: blue;
  font-style: underline;
}

.review_course_name {
  font-size: 20pt;
  background-color: light;
  text-align: left;
}

.review_prof_name {
  font-size: 20pt;
  background-color: light;
  text-align: left;
}

.rating_string {
  text-align: left;
  font-size: 18pt;
}

/* The following is for the portion that confirms the delection */ 

.confirmation_title {
  font-size: 25pt;
  text-align: left;
}

.confirmation_text {
  font-size: 20pt;
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
}

.similarity_text {
  font-size: 15pt;
  padding-top: 10px;
}


</style>