<template>
  <div class="container">
    <div class="notes-grid">
      <nuxt-link class="note note-add" to="/create"></nuxt-link>
      <NoteComponent v-for="note in notes" :entity="note" :key="note.id" />
      <div class="note"></div>
    </div>
  </div>
</template>

<script setup>
import { getAllNotes } from "../../helpers/store.js";
import NoteComponent from "./NoteComponent.vue";

const notes = ref([]);

onMounted(() => {
  notes.value = getAllNotes();
  console.log(notes.value);
});
</script>

<style scoped></style>
