<template>
  <div class="note">
    <h3>{{ entity?.title }}</h3>
    <div v-for="todo in preTodos" class="note__todo">
      <BaseCheckbox disabled :checked="todo.done" /><span>{{ todo.text }}</span>
    </div>
    <a class="note__controls">
      <div
        class="note__controls__control-wrap"
        role="button"
        @click="deleteNote"
      >
        <span>Удалить</span>
      </div>
      <nuxt-link class="note__controls__control-wrap" :to="`/edit/${entity.id}`"
        >Изменить</nuxt-link
      >
    </a>
  </div>
</template>

<script setup>
import BaseCheckbox from "../Form/BaseCheckbox.vue";
import { deleteNoteById } from "../../helpers/store.js";
const emit = defineEmits(["refetch"]);
const { entity = {} } = defineProps({
  entity: Object,
});

const preTodos = computed(() => entity?.todos?.slice(0, 4));

function deleteNote() {
  const userConfirm = confirm(
    `Вы уверены, что хотите удалить заметку: ${entity.title}`
  );
  if (userConfirm) {
    deleteNoteById(entity.id);
    emit("refetch");
  }
}
</script>

<style scoped></style>
