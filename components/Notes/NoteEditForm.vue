<template>
  <form class="notes-form" @submit.prevent v-if="todos?.length">
    <BaseInput type="text" label="Заголовок" v-model="noteHeader"></BaseInput>
    <div class="todos-list">
      <h2>Список задач</h2>

      <TodoComponent
        v-for="(todo, ind) in todos"
        :key="todo.id"
        :todo="todo"
        @edit="onEdit"
      />
    </div>
    <BaseButton @click="addTodo">Добавить задачу</BaseButton>
    <BaseButton @click="saveNote">Сохранить изменения</BaseButton>
    <BaseButton @click="onUndo" :disabled="!undoBuffer.length"
      >Отменить внесенное изменение</BaseButton
    >
    <BaseButton @click="onRedo" :disabled="!redoBuffer.length"
      >Повторить отмененное изменение</BaseButton
    >
    <BaseButton @click="onCancel">Отменить редактирование</BaseButton>
    <BaseButton @click="saveNote">Удалить заметку</BaseButton>
  </form>
</template>

<script setup>
import BaseButton from "../Form/BaseButton.vue";
import BaseInput from "../Form/BaseInput.vue";
import { getNoteById, storeNote } from "../../helpers/store.js";
import { todoModel } from "../../helpers/models.js";
import BaseCheckbox from "../Form/BaseCheckbox.vue";
import TodoComponent from "./TodoComponent.vue";

const route = useRoute();
const router = useRouter();

const id = computed(() => route?.params?.id);

const note = ref(null);

const noteHeader = ref("");
const todos = ref([]);

const undoBuffer = ref([]);
const redoBuffer = ref([]);

onMounted(() => {
  note.value = getNoteById(id.value);
  noteHeader.value = note.value.title;
  todos.value = note.value.todos;
});

function onEdit(id, data) {
  console.log(data, id, "editing");
  redoBuffer.value.push({ id, ...data });

  let todoIndex = todos.value.findIndex((el) => el.id === id);
  undoBuffer.value.push({ ...todos.value[todoIndex] });
  todos.value[todoIndex] = { ...todos.value[todoIndex], ...data };
  console.log(undoBuffer.value, "undoBuffer");
}

function onUndo() {
  const todoToUndo = undoBuffer.value.pop();
  let todoIndex = todos.value.findIndex((el) => el.id === todoToUndo.id);
  todos.value[todoIndex] = todoToUndo;
}
function onRedo() {
  const todoToRedo = redoBuffer.value.pop();
  let todoIndex = todos.value.findIndex((el) => el.id === todoToRedo.id);
  todos.value[todoIndex] = todoToRedo;
}

function addTodo() {
  todos.value.push({ ...todoModel, id: todos.value?.length + 1 });
}
function onCancel() {
  const userConfirm = confirm(
    "Отменить редактирование и вернуться на предыдущий экран?"
  );
  if (userConfirm) {
    router.push("/");
  }
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
