<template>
  <div>
    <b-modal id="profile-modal" title="Profile Settings" hideFooter @hidden="clear" @show="show">
      <b-form-group label="Name">
        <b-form-input id="user-name" v-model="name" type="text" required></b-form-input>
      </b-form-group>
      <b-form @submit="handleSubmit">
        <b-form-group label="Email Address">
          <b-form-input
            id="user-email"
            v-model="email"
            type="email"
            :state="check_error('email')"
            @change="errors.email = null"
            required
          ></b-form-input>
          <b-form-invalid-feedback id="email-error">{{get_error('email')}}</b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="New Password">
          <b-form-input id="user-password" v-model="password" type="password"></b-form-input>
        </b-form-group>
        <b-form-group label="School">
          <div v-if="status === 'success'">
            <v-select
              :options="schools"
              label="name"
              @input="setSchool"
              :clearable="false"
              :placeholder="school.name"
            ></v-select>
          </div>
          <!--- add loading wheel here --->
        </b-form-group>
        <div>
          <b-button type="submit" block variant="outline-primary">
            <div v-if="authStatus === 'loading'">
              <b-icon icon="arrow-clockwise" animation="spin"></b-icon>
            </div>
            <div v-else>Update Profile</div>
          </b-button>
        </div>
      </b-form>

      <hr />
      <b-button
        block
        variant="info"
        @click="update_learning_preferences"
      >Click To Update Learning Preferences</b-button>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  /* eslint-disable no-console */
  name: "Profile",
  data() {
    return {
      status: "undefined",
      schools: [],
      changes: {},
      errors: {}
    };
  },
  computed: {
    email: {
      get() {
        return this.$store.getters.getUser.email;
      },
      set(value) {
        this.changes.email = value;
      }
    },
    name: {
      get() {
        return this.$store.getters.getUser.name;
      },
      set(value) {
        this.changes.name = value;
      }
    },
    school: {
      get() {
        return this.$store.getters.getUser.school;
      }
    },
    password: {
      get() {
        return "";
      },
      set(value) {
        if (value.length > 0) {
          this.changes.password = value;
        } else {
          delete this.changes.password;
        }
      }
    },
    authStatus() {
      return this.$store.getters.authStatus;
    }
  },
  methods: {
    show() {
      this.loadSchools();
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
    setSchool(value) {
      this.changes.school_id = value.id;
    },
    check_error(error) {
      return this.errors[error] ? false : null;
    },
    get_error(error) {
      return `${this.errors[error]}`;
    },
    handleSubmit(evt) {
      evt.preventDefault();
      this.update_user();
    },
    update_user() {
      /*
    You need to implement this.$store.dispatch('update_user', user_updates)
    Don't worry about changing school yet.
    Look at Register and Login components and the Vuex store in store/auth.js for help
    Also this page https://vuex.vuejs.org
    */
      this.$store
        .dispatch("update_user", this.changes)
        .then(() => {
          this.$bvModal.hide("profile-modal");
          this.clear();
        })
        .catch(err => {
          this.errors = err.response.data;
        });
    },
    clear() {
      this.changes = {};
      this.errors = {};
    },
    update_learning_preferences() {
      // the user is redirected to the quiz page, where they
      // can retake the quiz and update learning preference info
      this.$bvModal.hide("profile-modal");
      this.clear();
      this.$router.push("/quiz");
    }
  },
  props: {}
};
</script>