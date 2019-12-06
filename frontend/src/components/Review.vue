<template>
    <div class="card" :key="review.id+0"> 
                  <div class="card-text" :key="review.id+1">
                    <div class="card-text" :key="review.id+2">
					<div class="card-header">
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
					  <h2 class="rating_string"> Ranking: {{review.rating }} / 5 </h2>
					  </div>
					  
					  
						<footer class="footer">
                      <!-- Display any comments -->
                      <p class="review_comment" v-if="review.comment.length != 0 "> <b>Student Comments:</b> <br/> {{review.comment }} </p>
                      <p class="review_comment" v-else> <b>Student Comments:</b> <br/> <i>No Comments Were Submitted</i> </p>
					  <div class="card-body" :key="review.id+3">
                        <h2 class="date_string"> {{ convertDateStringToDateRepresentation(review.created) }}</h2>
						</div>
					  </footer>
                    </div>
                  </div>
                </div>
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
  margin-top:5px;
}

.date_string {
  font-size: 12pt;
  margin-left: 3px;
  text-align: right;
}

.rating_string {
  font-size: 18pt;
  text-align: left;
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
</style>