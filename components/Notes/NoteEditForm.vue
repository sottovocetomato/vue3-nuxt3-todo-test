<template>
  <form class="notes-form" @submit.prevent v-if="todos?.length">
    <BaseInput type="text" label="Заголовок" v-model="noteHeader"></BaseInput>
    <div class="todos-list">
      <h2>Список задач</h2>

      <div
        class="todo-list__todo-edit"
        v-for="(todo, ind) in todos"
        :key="todo.id"
      >
        <BaseCheckbox v-model="todo.done" />
        <BaseInput type="text" v-model="todos.text" disabled></BaseInput>
      </div>
    </div>
    <BaseButton text="Добавить задачу" @click="addTodo" />
    <BaseButton text="Сохранить заметку" @click="saveNote" />
  </form>
</template>

<script setup>
import BaseButton from "../Form/BaseButton.vue";
import BaseInput from "../Form/BaseInput.vue";
import { getNoteById, storeNote } from "../../helpers/store.js";
import { todoModel } from "../../helpers/models.js";
import BaseCheckbox from "../Form/BaseCheckbox.vue";

const route = useRoute();

const id = computed(() => route?.params?.id);

const note = ref(null);

const noteHeader = ref("");
const todos = ref([]);

onMounted(() => {
  note.value = getNoteById(id.value);
  noteHeader.value = note.value.title;
  todos.value = note.value.todos;
  console.log(note.value);
  console.log(id.value);
  console.log(todos.value);
});

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
