<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-input
        id="input-name"
        v-model="credentials.name"
        required
        placeholder="Name"
      ></b-form-input>
      <br />
      <b-form-input
        id="input-email"
        v-model="credentials.email"
        type="email"
        required
        placeholder="Email"
      ></b-form-input>
      <br />
      <b-form-input
        id="input-password"
        v-model="credentials.password"
        type="password"
        required
        placeholder="Password"
      ></b-form-input>
      <br />
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      credentials: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
    }
  }
};
</script>