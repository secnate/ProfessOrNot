// This modal is shown as the second modal for registering a professor
<template>
    <b-modal
      id="sure-to-delete-modal"
      title="Are You Sure You Want To Delete This Review?"
      ok-title="Yes"
      @cancel="closeModal"
      @close="closeModal"
      @ok="submit"
      centered
    >
      <h1 class="warning_text"> WARNING: This Step Is Irreversible </h1>
    </b-modal>
</template>

<script>

export default {
  /* eslint-disable no-console */
  name: "DeleteModal",
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
    submit(event) {
      event.preventDefault();
      
      console.log("DEBUG: deleting the review");
      this.$emit("confirm-delete");
      this.closeModal();
    },
    closeModal() {
      // close the window
      this.$bvModal.hide("sure-to-delete-modal");
    }
  },
  props: {
  },
  components: {
  }
};
</script>

<style>
.warning_text {
  font-size: 20pt;
}

.modal-backdrop-show {
  opacity: 0.5;
}

</style>



