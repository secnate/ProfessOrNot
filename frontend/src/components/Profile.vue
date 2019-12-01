<template>
  <div>
    <b-modal id="my-modal" title="Profile Settings" hide-footer>
      <b-form @submit="onSubmit">
        <b-form-group label="Name">
          <b-form-input id="user-name" v-model="user.name" type="text" required></b-form-input>
          <br />
          <b-form-group label="Email">
            <b-form-input id="user-email" v-model="user.email" type="email" required></b-form-input>
          </b-form-group>
          <b-form-group label="Password">
            <b-form-input id="user-password" v-model="user.password" type="password" required></b-form-input>
          </b-form-group>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
export default {
  name: "Profile",
  computed: {
    ...mapGetters(["getUser"])
  },
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        school_id: 1 // U of SC is the default
      }
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.updateProfile();
    },
    updateProfile() {
      /* eslint-disable no-console */
      console.log("DEBUG: that's for WILL BOOTLE") /* eslint-disable no-console */
    }
  },
  props: {}
};
</script>
