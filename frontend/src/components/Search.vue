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
    />

    <!-- Filtered List -->

    <li id="bordered-list" v-for="(item, index) in filteredList" :key="index">
      <button id="button" @click="handleClick(item)">{{ item.name }}</button>
    </li>
    <!--
    <li id="inputed-text" style="if (this.text.length == 0) display:none;">
      <button id="text-button" @click="handleClick(item)">{{text}}</button>
    </li>
    <a>{{text.length}}</a>-->
  </div>
</template>

<script>
import axios from "axios"; // Communicates w/ backend
export default {
  /* eslint-disable no-console */
  name: "Search",
  components: {},
  data() {
    return {
      previousSearchText: "",
      text: "",
      searchArray: [],
      backend_query_length_threshold: 2
    };
  },
  methods: {
    searchInputChanged() {
      console.log("DEBUG: search input changed and is: " + this.text);
      if (this.text.length == this.backend_query_length_threshold && 
          this.text.length > this.previousSearchText.length ) {
        this.getSearchFromBackend();
      } 
      else if (this.text.length == this.backend_query_length_threshold &&
               this.text.length < this.previousSearchText.length ) {
          
          this.searchArray = []
       }

      this.previousSearchText = this.text;
    },
    getSearchFromBackend() {
      //es
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
            console.log("DEBUG: resp.data is: " + JSON.stringify(resp.data));
            this.searchArray = resp.data;
            // Ignore for now...
            // --------------------------------------------------------------------
            // I now append the default object that will represent the case
            // where a user enters in a new professor that is not in the database
            /*             this.arrayProfs.push({
              id: this.newProfOrCourseDefaultID,
              name: this.getNewProfessorItemString()
            }); */
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
    },
    handleClick(item) {
      console.log(item.type);
      console.log(item.id);
    }
  },
  computed: {
    filteredList() {
      return this.searchArray.filter(searchArray => {
        return searchArray.name.toLowerCase().includes(this.text.toLowerCase());
      });
    }
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