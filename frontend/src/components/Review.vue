<template>
    <b-container :key="review.id+0" class="review_box"> 
                  <b-row :key="review.id+1">
                    <b-col cols="8" class="review_left_col" :key="review.id+2">
                      <p class="review_prof_name" v-if="!hideProfessorName"> <b>Professor: </b> 
                        <router-link :to="{name: 'professor', params: {id : review.professor.id }}">
                          <b>{{ review.professor.name }}</b>
                        </router-link>
                      </p>
                      <p class="review_course_name" v-if="!hideCourseName"> <b>Course: </b> 
                        <router-link :to="{name: 'course', params: {id : review.course.id }}">
                          <b>{{ review.course.name }}</b>
                        </router-link>
                      </p>

                      <!-- Display any comments -->
                      <p class="review_comment" v-if="review.comment.length != 0 "> <b>Student Comments:</b> <br/> {{review.comment }} </p>
                      <p class="review_comment" v-else> <b>Student Comments:</b> <br/> <i>No Comments Were Submitted</i> </p>
                    </b-col>

                    <b-col cols="4" class="review_right_col" :key="review.id+3">
                      <b-row>
                        <h2 class="rating_string"> Ranking: {{review.rating }} / 5 </h2>
                      </b-row>

                      <b-row>
                        <h2 class="date_string"> {{ convertDateStringToDateRepresentation(review.created) }}</h2>
                      </b-row>
                    </b-col>
                  </b-row>
                </b-container>
</template>

<script>
export default {
    name: "Review",
    methods: {
    convertDateStringToDateRepresentation(date_str) {
      var dateObj = new Date(date_str)
      return dateObj.toLocaleDateString("en-US")
    }
    },
    props: {
        hideProfessorName: Boolean,
        hideCourseName: Boolean,
        review: Object
    }
}
</script>

<style scoped>
.professorTitle {
  font-size: 40pt;
}

.professorInfoBody {
  background-color: none;
}

.review_box {
  border: 1px black solid;
}

.review_left_col {
  font-style: bold;
  background-color: lightblue;
}

.review_right_col {
  font-style: bold;
  background-color: lightblue;
  border-left: black 2px solid;
}

.review_comment {
  font-size: 15pt;
  width: 100%;
  background-color: none;
  text-align: left;
}

.date_string {
  font-size: 15pt;
  text-align: center;
  margin-left: 3px;
}

.rating_string {
  font-size: 18pt;
  text-align: center;
  margin-left: 3px;
  margin-top: 3px;
}

.makeNewReview {
  color: blue;
  font-style: underline;
}

.review_course_name {
  font-size: 17pt;
  background-color: lightblue;
  text-align: left;
}

.review_prof_name {
  font-size: 17pt;
  background-color: lightblue;
  text-align: left;
}
</style>