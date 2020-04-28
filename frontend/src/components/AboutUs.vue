<template>
  <div>
    <div v-if="$store.getters.isAuthenticated">
      <Navbar />
    </div>
    <div v-else>
      <b-navbar toggleable="lg" type="dark" variant="primary" fixed="top" ref="nav_bar">
        <b-navbar-brand to="/" class="pl-4">
          <img src="../assets/logotitle.svg" margin-left="10" alt="bb" width="300" />
        </b-navbar-brand>
      </b-navbar>
    </div>
    <br />
    <div>
      <div class="page-title">Everything You Should Know About Us</div>
      <div class="card" style="margin = 40px">
        <!-- <div class="card-md-6"> -->
        <div class="card-body" align="center" style="margin=40px">
          ProfessOrNot is a new and innovative online destinations for professor
          ratings. Any user has the ability to search a professor that teaches
          at any university in any state throughout the United States. ProfessOrNot
          is a website build by students for students and it helps ensure that students
          are taking the best possible professor for their needs. This website relies
          on user generated responses and heuristics to make sure we are providing
          our clients with a reliable and consistent experience.
          <br />
          <br />After
          searching a professor the user can then view user-generated ratings
          that have been posted by students that have taken a class with the
          same professor before. Users also have the option to add tags to
          the teacher such as
          <i>
            Homework Heavy, Lecture Intensive or
            Difficult Exams
          </i>. By combining all of these features with a
          new and improved heuristics quiz system it allows for us to
          help predict what professors we think would be the best option
          for each and every user!
        </div>
      </div>
    </div>
    <div class="mt-5">
      <h1>Developed By:</h1>
      <ul class="h4 pt-3">
        <li>
          <h2>
            Will Bootle
            (<b-link href="https://github.com/willbootle">@willbootle</b-link>)
          </h2>
        </li>
        <li>
          <h2>
            Nathan Pavlovsky
            (<b-link href="https://github.com/NathanPavlovsky">@NathanPavlovsky</b-link>)
          </h2>
        </li>
        <li>
          <h2>
            Alex Brock
            (<b-link href="https://github.com/brockthealex">@brockthealex</b-link>)
          </h2>
        </li>
        <li>
          <h2>
            Matt Hayward
            (<b-link href="https://github.com/mhayward12">@mhayward12</b-link>)
          </h2>
        </li>
        <li>
          <h2>
            Kassidy Block
            (<b-link href="https://github.com/mhayward12">@kblock97</b-link>) [1st Semester]
          </h2>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";

export default {
  name: "AboutUs",
  components: {
    Navbar
  },
  data() {
    return {};
  },
  methods: {},
  computed: {}
};
</script>

<style scoped>
.titleImage {
  margin: 0 auto;
  width: 80%;
}
.page-title {
  font-weight: bold;
}
/* .card-text {
        font-style: italic;
    } */
.container-fluid {
  background-color: white;
  font-size: 22px;
  margin-bottom: 5%;
}
.card-body {
  margin: 20px;
}
/*.page-title {*/
/*width: 100%;*/
/*font-family: "league_gothicregular";*/
/*color: black;*/
/*font-size: 52px;*/
/*padding-bottom: 10px;*/
/*}*/
.features {
  background-color: lightgray;
}
.page-title,
.page-subtitle {
  width: 100%;
  color: #00adee;
  font-size: 52px;
  padding-bottom: 25px;
}

ul {
  list-style-type: none;
}
</style>
