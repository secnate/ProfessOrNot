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
        required
        placeholder="Email"
      ></b-form-input>
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
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      this.register()
    },
    register: function() {
      let user = this.newUser
      this.$store.dispatch('register', user)
      .then(() => this.$router.push('/'))
      .catch(err => {
         if (err.response.status == 400) {
           this.$parent.loginAlert = "This E-Mail is already registered!"
         } else {
           this.$parent.loginAlert = err
         }
       })
    }
  }
};
</script>