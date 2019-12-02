<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-input id="input-name" v-model="newUser.name" required placeholder="Name"></b-form-input>
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
      <v-select
        :options="schools"
        label="name"
        @input="setSchool"
        :clearable="false"
        placeholder=" School"
      ></v-select>
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
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      schools: [],
      newUser: {
        name: "",
        email: "",
        password: "",
        school_id: 0
      },
      errors: {}
    };
  },
  mounted() {
    this.loadSchools();
  },
  methods: {
    check_error(error) {
      return this.errors[error] ? false : null;
    },
    get_error(error) {
      return `${this.errors[error]}`;
    },
    setSchool(value) {
      this.newUser.school_id = value.id;
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.register();
    },
    loadSchools() {
      new Promise((resolve, reject) => {
        this.status = "loading"; // we can show a loading wheel while in this state
        axios({
          url: "/schools",
          method: "GET"
        })
          .then(resp => {
            this.schools = resp.data;
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
    register: function() {
      let user = this.newUser;
      this.$store
        .dispatch("register", user)
        .then(() => this.$router.push("/"))
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