<template>
  <div class="container">
    <NoteForm />
  </div>
</template>

<script>
import BaseInput from "../../components/Form/BaseInput.vue";
import NoteForm from "../../components/Notes/NoteForm.vue";
export default {
  name: "[id]",
  components: { NoteForm, BaseInput },
};
</script>

<style scoped></style>
