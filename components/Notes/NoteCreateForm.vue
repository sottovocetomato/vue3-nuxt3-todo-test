<template>
  <form class="notes-form" @submit.prevent>
    <BaseInput type="text" label="Заголовок" v-model="noteHeader"></BaseInput>
    <div class="todos-list">
      <h2>Список задач</h2>
      <BaseInput
        v-for="todo in todos"
        :key="todo.id"
        type="text"
        v-model="todo.text"
      ></BaseInput>
    </div>
    <BaseButton text="Добавить задачу" @click="addTodo" />
    <BaseButton text="Сохранить заметку" @click="saveNote" />
  </form>
</template>

<script setup>
import BaseButton from "../Form/BaseButton.vue";
import BaseInput from "../Form/BaseInput.vue";
import { storeNote } from "../../helpers/store.js";

const noteHeader = ref("");
const todos = ref([{ ...todoModel, id: 1 }]);

function addTodo() {
  todos.value.push({ ...todoModel, id: todos.value?.length + 1 });
}

function saveNote() {
  todos.value = todos.value.filter((todo) => !!todo.text);
  const currentNote = {
    id: null,
    todos: [...todos.value],
    title: noteHeader.value,
  };
  storeNote(currentNote);
}
</script>

<style scoped></style>
