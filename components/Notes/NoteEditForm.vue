<template>
  <form class="notes-form" @submit.prevent v-if="todos?.length">
    <h2>Заголовок</h2>
    <BaseInput type="text" v-model="noteHeader"></BaseInput>

    <h2>Список задач</h2>
    <div class="todos-list">
      <TodoComponent
        v-for="(todo, ind) in todos"
        :key="todo.id"
        :todo="todo"
        @edit="onEdit"
      />
    </div>
    <div class="notes-form__controls">
      <BaseButton @click="addTodo" title="Добавить поле">
        <IconsAdd />
      </BaseButton>

      <BaseButton
        @click="onUndo"
        :disabled="!undoBuffer.length"
        title="Отменить действие"
      >
        <IconsUndo />
      </BaseButton>
      <BaseButton
        @click="onRedo"
        :disabled="!redoBuffer.length"
        title="Повторить отмененное действие"
      >
        <IconsRedo />
      </BaseButton>
      <BaseButton @click="saveNote" title="Сохранить изменения">
        <IconsSave />
      </BaseButton>
      <BaseButton
        variant="danger"
        @click="onCancel"
        title="Отмена редактирования"
      >
        <IconsCancel />
      </BaseButton>
    </div>
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
  // addToRedoBuffer(id, data);
  let todoIndex = todos.value.findIndex((el) => el.id === id);
  addToUndoBuffer(todoIndex);
  todos.value[todoIndex] = { ...todos.value[todoIndex], ...data };
  console.log(undoBuffer.value, "undoBuffer");
}

function onUndo() {
  const todoToUndo = undoBuffer.value.pop();
  console.log(todoToUndo, "todoToUndo");
  let todoIndex = todos.value.findIndex((el) => el.id === todoToUndo.id);
  addToRedoBuffer(id, todos.value[todoIndex]);
  todos.value[todoIndex] = todoToUndo;
}
function onRedo() {
  const todoToRedo = redoBuffer.value.pop();
  let todoIndex = todos.value.findIndex((el) => el.id === todoToRedo.id);
  todos.value[todoIndex] = todoToRedo;
}

function addTodo() {
  if (todos.value.length > 10) {
    alert("Вы добавили максимальное количество задач!");
    return;
  }
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
function addToRedoBuffer(id, data) {
  if (redoBuffer.value.length < 5) {
    redoBuffer.value.push({ id, ...data });
  } else {
    redoBuffer.value.shift();
    redoBuffer.value.push({ id, ...data });
  }
}
function addToUndoBuffer(todoIndex) {
  if (undoBuffer.value.length < 5) {
    undoBuffer.value.push({ ...todos.value[todoIndex] });
  } else {
    undoBuffer.value.shift();
    undoBuffer.value.push({ ...todos.value[todoIndex] });
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
