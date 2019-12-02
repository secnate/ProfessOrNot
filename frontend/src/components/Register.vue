<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-input
        id="input-name"
        v-model="newUser.name"
        required
        placeholder="Name"
      ></b-form-input>
      <br />
      <b-form-input
        id="input-email"
        v-model="newUser.email"
        type="email"
        @change="errors.email = null"
        :state="check_error('email')"
        required
        placeholder="Email"
      ></b-form-input>
      <b-form-invalid-feedback id="email-error">{{get_error('email')}}</b-form-invalid-feedback>
      <br />
      <b-form-input
        id="input-password"
        v-model="newUser.password"
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
      newUser: {
        name: "",
        email: "",
        password: ""
      },
      errors: {}
    };
  },
  methods: {
    check_error(error) {
      return this.errors[error] ? false : null;
    },
    get_error(error) {
      return `${this.errors[error]}`
    },
    onSubmit(evt) {
      evt.preventDefault()
      this.register()
    },
    register: function() {
      let user = this.newUser
      this.$store.dispatch('register', user)
      .then(() => this.$router.push('/'))
      .catch(err => {
          this.errors = err.response.data;
          for (const property in this.errors) {
            console.log(`${this.errors[property]}`);
          }
        });
    }
  }
};
</script>