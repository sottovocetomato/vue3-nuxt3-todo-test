<template>
  <form class="notes-form notes-form-edit" @submit.prevent v-if="todos?.length">
    <h2>Заголовок</h2>
    <BaseInput type="text" v-model="noteHeader"></BaseInput>

    <h2>Список задач</h2>
    <div class="todos-list">
      <TodoComponent
        v-for="(todo, ind) in todos"
        :key="`${todo.id}-${ind}`"
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
import { getNoteById, storeNote, updateNote } from "../../helpers/store.js";
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
  // addToRedoBuffer(id, data);
  addToUndoBuffer(id);
  const todoIndex = todos.value?.findIndex((todo) => todo?.id === id);
  todos.value[todoIndex] = { ...todos.value[id], ...data };
  console.log(undoBuffer.value, "undoBuffer");
}

function onUndo() {
  const undoData = undoBuffer.value.pop();
  const todoToUndo = undoData?.data;
  const todoMeta = undoData?.meta;
  let todoIndex = todos.value?.findIndex((todo) => todo?.id === todoToUndo?.id);

  if (todoIndex === -1) {
    todoIndex = todoToUndo?.id;
  }

  if (todoMeta?.delete) {
    addToRedoBuffer(id, {
      data: todoToUndo,
      meta: todoMeta,
    });
    todos.value.splice(todoIndex, 0, todoToUndo);
    return;
  }

  if (todoMeta?.new) {
    addToRedoBuffer(id, {
      data: todoToUndo,
      meta: todoMeta,
    });
    todos.value.pop();
    return;
  }
  addToRedoBuffer(id, {
    data: { ...todos.value[todoIndex] },
    meta: todoMeta,
  });
  todos.value[todoIndex] = todoToUndo;
}

function onRedo() {
  const redoData = redoBuffer.value.pop();
  const todoToRedo = redoData?.data;
  const todoMeta = redoData?.meta;

  let todoIndex = todos.value?.findIndex((todo) => todo?.id === todoToRedo?.id);

  if (todoIndex === -1) {
    todoIndex = todoToRedo?.id;
  }

  addToUndoBuffer(todoIndex, todoMeta);
  if (todoMeta?.delete) {
    todos.value.splice(todoIndex, 1);

    return;
  }
  if (todoMeta?.new) {
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
  todos.value.push({ ...todoModel, id: todoIndex, new: true });
  addToUndoBuffer(todoIndex, { new: true });
}

function onDelete(id) {
  console.log(todos.value);
  addToUndoBuffer(id, { delete: true });
  todos.value = todos.value.filter((el) => el.id !== id);
  removeFromRedoBuffer(id);
}

function onCancel() {
  const userConfirm = confirm(
    "Отменить редактирование и вернуться на предыдущий экран?"
  );
  if (userConfirm) {
    router.push("/");
  }
}
function addToRedoBuffer(id, { data = {}, meta = {} }) {
  if (redoBuffer.value.length >= 5) {
    redoBuffer.value.shift();
  }
  redoBuffer.value.push({
    data: {
      id,
      ...data,
    },
    meta,
  });
  console.log(redoBuffer.value, "redoBuffer.value");
}
function removeFromRedoBuffer(id) {
  redoBuffer.value = redoBuffer.value.filter((b) => b.data.id !== id);
}
function addToUndoBuffer(todoIndex, meta = {}) {
  if (undoBuffer.value.length >= 5) {
    undoBuffer.value.shift();
  }
  undoBuffer.value.push({
    data: { ...todos.value[todoIndex] },
    meta,
  });
}

function saveNote() {
  todos.value = todos.value.filter((todo) => !!todo.text);
  const dataToStore = {
    todos: [...todos.value],
    title: noteHeader.value,
  };
  updateNote(id.value, dataToStore);
  router.push("/");
}
</script>

<style scoped></style>
