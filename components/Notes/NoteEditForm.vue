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
        @delete="onDelete"
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
  addToUndoBuffer(id);
  todos.value[id] = { ...todos.value[id], ...data };
  console.log(undoBuffer.value, "undoBuffer");
}

function onUndo() {
  const undoData = undoBuffer.value.pop();
  const todoToUndo = undoData?.data;
  const snapshotLength = undoData?.length;
  const currentLength = todos.value?.length;
  const todoIndex = todoToUndo?.id;

  if (snapshotLength > currentLength) {
    addToRedoBuffer(id, todoToUndo);
    todos.value.splice(todoIndex, 0, todoToUndo);
    return;
  }
  if (snapshotLength < currentLength) {
    addToRedoBuffer(id, todoToUndo);
    todos.value.pop();
    return;
  }
  addToRedoBuffer(id, {
    ...todos.value[todoIndex],
  });
  todos.value[todoIndex] = todoToUndo;
}

function onRedo() {
  const redoData = redoBuffer.value.pop();
  const todoToRedo = redoData?.data;
  const snapshotLength = redoData?.length;
  const currentLength = todos.value?.length;
  const todoIndex = todoToRedo?.id;
  console.log(todoToRedo, "todoToRedo");
  if (snapshotLength < currentLength) {
    todos.value.splice(todoIndex, 1);
    return;
  }
  if (snapshotLength > currentLength) {
    todos.value.push(todoToRedo);
    return;
  }
  todos.value[todoIndex] = todoToRedo;
}

function addTodo() {
  if (todos.value.length > 10) {
    alert("Вы добавили максимальное количество задач!");
    return;
  }
  const todoIndex = todos.value?.length;
  addToUndoBuffer(todoIndex);
  todos.value.push({ ...todoModel, id: todoIndex });
}

function onDelete(id) {
  addToUndoBuffer(id);
  todos.value = todos.value.filter((el) => el.id !== id);
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
  const length = todos.value.length;
  if (redoBuffer.value.length >= 5) {
    redoBuffer.value.shift();
  }
  redoBuffer.value.push({
    data: {
      id,
      ...data,
    },
    length,
  });
}
function addToUndoBuffer(todoIndex) {
  const length = todos.value.length;
  if (undoBuffer.value.length >= 5) {
    undoBuffer.value.shift();
  }
  undoBuffer.value.push({
    data: { ...todos.value[todoIndex] },
    length,
  });
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
