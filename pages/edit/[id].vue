<template>
  <div class="container">
    <NoteEditForm />
  </div>
</template>

<script>
import BaseInput from "../../components/Form/BaseInput.vue";
import NoteForm from "../../components/Notes/NoteCreateForm.vue";
import NoteEditForm from "../../components/Notes/NoteEditForm.vue";
export default {
  name: "[id]",
  components: { NoteEditForm },
};
</script>

<style scoped></style>
