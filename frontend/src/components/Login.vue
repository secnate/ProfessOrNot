<template>

<div>
    <b-form @submit="onSubmit">
        <b-form-input
          id="input-email"
          v-model="credentials.email"
          type="email"
          required
          placeholder="Email"
        ></b-form-input>
        <br>
        <b-form-input
          id="input-password"
          v-model="credentials.password"
          type="password"
          required
          placeholder="Password"
        ></b-form-input>
        <br>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
   name: 'Login',
  data() {
    return {
      credentials: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
      onSubmit(evt) {
          evt.preventDefault()
          this.login()
      },
      login () {
        let email = this.credentials.email 
        let password = this.credentials.password
        this.$store.dispatch('login', { email, password })
       .then(() => this.$router.push('/'))
       .catch(err => {
         if (err.response.status == 400) {
           this.$parent.loginAlert = "Wrong Username/Password"
         } else {
           this.$parent.loginAlert = err
         }
       })
      }
    }
  
};
</script>
