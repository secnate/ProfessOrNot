<template>
  <div>
    <b-modal id="profile-modal" title="Profile Settings" hideFooter @hidden="clear">
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
        <b-form-group label="Name">
          <b-form-input id="user-name" v-model="name" type="text" required></b-form-input>
        </b-form-group>
        <div>
          <b-button type="submit" block variant="outline-primary">Update Profile</b-button>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  /* eslint-disable no-console */
  name: "Profile",
  data() {
    return {
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
    }
  },
  methods: {
    check_error(error) {
      return this.errors[error] ? false : null;
    },
    get_error(error) {
      return `${this.errors[error]}`
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
    }
  },
  props: {}
};
</script>