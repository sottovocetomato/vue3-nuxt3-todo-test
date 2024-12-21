<template>
  <div class="container">
    <div class="notes-grid">
      <nuxt-link class="note note-add" to="/create"></nuxt-link>
      <span v-if="loading">Загрузка данных...</span>
      <NoteComponent
        v-else
        v-for="note in notes"
        :entity="note"
        :key="note.id"
        @refetch="loadData"
      />
    </div>
  </div>
</template>

<script setup>
import { getAllNotes } from "../../helpers/store.js";
import NoteComponent from "./NoteComponent.vue";

onMounted(() => {
  loadData();
});
const notes = ref([]);
const loading = ref(true);

function loadData() {
  loading.value = true;
  notes.value = getAllNotes();
  loading.value = false;
}
</script>

<style scoped></style>
