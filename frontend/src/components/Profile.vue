<template>
  <div>
    <b-modal 
    id="my-modal"
    title="Profile Settings"

    >
      <b-form>
        <b-form-group
        label="Email Address"
        >
        <b-form-input
          id="user-email"
          :value="getUser.email"
          type="email"
          required
        ></b-form-input>
        </b-form-group>
        <b-form-group
        label="Name"
        >
        <b-form-input
          id="user-name"
          :value="getUser.name"
          type="text"
          required
        ></b-form-input>
        </b-form-group>
        <br>
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
  methods: {
  },
  props: {}
};
</script>