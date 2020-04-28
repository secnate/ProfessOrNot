<template>
  <div>
    <b-form inline @submit="onSubmit">
      <b-form-input
        size="sm"
        class="mr-sm-2"
        id="input-email"
        v-model="credentials.email"
        type="email"
        required
        placeholder="Email"
      ></b-form-input>
      <b-form-input
        size="sm"
        class="mr-sm-2"
        id="input-password"
        v-model="credentials.password"
        type="password"
        required
        placeholder="Password"
      ></b-form-input>
      <b-button size="sm" variant="info" type="submit">
        <div v-if="authStatus === 'loading'">
          <b-icon icon="arrow-clockwise" animation="spin"></b-icon>
        </div>
        <div v-else>Log In</div>
      </b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      credentials: {
        email: "",
        password: ""
      }
    };
  },
  computed: {
    authStatus() {
      return this.$store.getters.authStatus;
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.login();
    },
    login() {
      let email = this.credentials.email;
      let password = this.credentials.password;
      this.$store
        .dispatch("login", { email, password })
        .then(() => this.$router.push("/"))
        .catch(err => {
          if (err.response.status == 400) {
            this.$emit("setLoginError", "Wrong Username/Password");
          } else {
            this.$parent.loginAlert = err;
          }
        });
    }
  }
};
</script>
