<template>
  <div>
    <!-- Search Bar -->
    <input
      id="search-bar"
      v-model="text"
      type="text"
      required
      placeholder="Search Courses/Professors"
      autocomplete="off"
      @input="searchInputChanged"
      @keyup.enter="openNewTypedText()"
    />

    <!-- Filtered List -->

    <li id="bordered-list" v-for="(item, index) in filteredList" :key="index">
      <div v-if='item.type === "COURSE"'>
        <router-link :to="{name: 'course', params: {courseId : item.id }}">
          <b-button id="button" squared variant="outline-dark">{{ item.name }}</b-button>
        </router-link>
      </div>
      <div v-else-if='item.type === "PROFESSOR"'> 
        <router-link :to="{name: 'professor', params: {profId : item.id }}">
          <b-button id="button" squared variant="outline-dark">{{ item.name }}</b-button>
        </router-link>
      </div>
      <div v-else>
        <!-- this option reflects what the user currently has typed -->
        <b-button id="button" @click="openNewTypedText()" squared variant="outline-dark" v-b-modal.new-course-prof-modal>{{ item.name }}</b-button>
      </div>
      
    </li>

    <NewCourseOrProf :enteredText="text"/>
  </div>
</template>

<script>
import axios from "axios"; // Communicates w/ backend
import NewCourseOrProf from "./NewCourseOrProf.vue";
import router from "../router.js";

export default {
  /* eslint-disable no-console */
  name: "Search",
  data() {
    return {
      previousSearchText: "",
      text: "",
      searchArray: [],
      backend_query_length_threshold: 2,
      newProfOrCourseDefaultID: 0
    };
  },
  methods: {
    openNewTypedText() {
      // we decide whether this is the name of a new course or professor to be displayed

      // first I iterate over the filteredList and see if I have it match something
      var i = 0;
      for (i = 0; i < this.filteredList.length; i++) {
        if (this.text.toLowerCase() === this.filteredList[i].name.toLowerCase() ) {

          // it exists in the filtered list. we now programmatically go to the page
          if (this.filteredList[i].type === "PROFESSOR" && this.filteredList[i].id != this.newProfOrCourseDefaultID) {
            router.push({ name: 'professor', params: { profId: this.filteredList[i].id }})
          }
          else if (this.filteredList[i].type === "COURSE" && this.filteredList[i].id != this.newProfOrCourseDefaultID) {
            router.push({ name: 'course', params: { courseId: this.filteredList[i].id }})
          }
          else {
            console.log("This should never happen.")
          }

          // we moved on. terminate the function
          return;
        }
      }

      // didn't find it, so we present a modal clarifying if they want to create a new professor or course
      this.$bvModal.show('new-course-prof-modal')


      //-------------------------------------------------------------
      /*first iterate over filteredList 
        if lowercase string input is in filteredList -->
          go to that page 

      otherwise, display the new course or prof modal*/
    },
    searchInputChanged() {
      
      
      /////////////////////////////////////////////////////////////////
      // Updating the information queried from the backend and displayed in the page
      if (this.text.length == this.backend_query_length_threshold && 
          this.text.length >= this.previousSearchText.length ) {
        this.getSearchFromBackend();
      } 
      else if (this.text.length <= this.backend_query_length_threshold &&
               this.text.length < this.previousSearchText.length ) {
          this.searchArray = []
       }

      this.previousSearchText = this.text;

      // updating the entered input
      if (this.searchArray.length != 0) {
        // we check to see if the string matches an already-existing item exactly
        var i = 0
        var doesMatch = false
        for (i = 0; i < this.searchArray.length-1; i++) {
          if (this.searchArray[i].name.toLowerCase() === this.text.toLowerCase()) {
            doesMatch = true;
            break;
          }
        }

        if (doesMatch == true) {
          this.searchArray[this.searchArray.length - 1].name = "";
        }
        else {
          // doesn't match, keep the text of the string we find
          this.searchArray[this.searchArray.length - 1].name = this.text;
        }
      }
    },
    getSearchFromBackend() {
      // get the professors from the backend
      // add in a dummy value to the end of the list with id value 0.
      // we will be adjusting its name from there
      new Promise((resolve, reject) => {
        this.status = "loading"; // we can show a loading wheel while in this state
        var dataToPassIn = { filter: this.text };
        axios({
          url: "/search/" + this.text,
          data: dataToPassIn,
          method: "GET"
        })
          .then(resp => {
            console.log(resp);
            this.searchArray = resp.data;

            
            // --------------------------------------------------------------------
            // I now append the default object that will represent the case
            // where a user enters in a new professor that is not in the database
            this.searchArray.push({
              id: this.newProfOrCourseDefaultID,
              name: this.text,
              type: "USER_ENTERED_INPUT"
            });
            //---------------------------------------------------------------------
            
            this.status = "success";
            resolve(resp);
          })
          .catch(err => {
            console.log(err);
            this.status = "error";
            reject(err);
          });
      });
    }
  },
  computed: {
    filteredList() {
      // we return the items we are searching for as well as the very default item
      // representing the user's current input
      var toReturn = this.searchArray.filter(searchArray => {
        return searchArray.name.toLowerCase().includes(this.text.toLowerCase()) 
      });

      return toReturn
    }
  },
  beforeMount() {
    this.text = ""
    this.previousSearchText = ""
  },
  components: {
    NewCourseOrProf
  }
};
</script>

<style>
#search-bar {
  width: 80%;
  height: 40px;
  margin: 0 auto;
  color: black;
  border: 1px solid black;
  text-indent: 5px;
  font-size: 15pt;
}
li {
  width: 80%;
  list-style-type: none;
  margin: 0 auto;
  color: black;
  border: 1px solid black;
}
#button {
  width: 100%;
  text-align: left;
}
</style>