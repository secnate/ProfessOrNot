<template>
  <div>
    <b-modal id="profile-modal" title="Profile Settings" hideFooter @hidden="clear_changes">
      <b-form @submit="handleSubmit">
        <b-form-group label="Email Address">
          <b-form-input id="user-email" v-model="email" type="email" required></b-form-input>
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
      changes: {}
    }
  },
  computed: {
    email: {
      get() {
        return this.$store.getters.getUser.email
      },
      set(value) {
        this.changes.email = value
      }
    },
    name: {
      get() {
        return this.$store.getters.getUser.name
      },
      set(value) {
        this.changes.name = value
      }
    }
  },
  methods: {
    handleSubmit(evt) {
      evt.preventDefault();
      this.update_user
      this.$bvModal.hide('profile-modal')
    },
    update_user() {
    /*
    You need to implement this.$store.dispatch('update_user', user_updates)
    */
    },
    clear_changes() {
      this.changes = {}
    }
  },
  props: {}
};
</script>