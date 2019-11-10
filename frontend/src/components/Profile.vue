<template>
  <div>
    <b-modal 
    id="my-modal"
    title="Profile Settings"
    >
      <b-form>
        <b-form-group
        label="Name"
        >

          <b-form-input
            id="user-name"
            :value="getUser.name"
            type="text"
            required
          ></b-form-input>

          <br/>

          <b-form-group
          label="Email"
          >  
          <b-form-input
            id="user-email"
            :value="getUser.email"
            type="email"
            required
          ></b-form-input>
          </b-form-group>
                  

        </b-form-group>
      </b-form>
  </b-modal>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
export default {
  /* eslint-disable no-console */
  name: "Profile",
  computed: {
    ...mapGetters(["getUser"])
  },
  methods: {
  },
  props: {}
};
</script>
