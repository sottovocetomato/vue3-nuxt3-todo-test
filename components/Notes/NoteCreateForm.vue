<template>
  <form class="notes-form" @submit.prevent>
    <BaseInput
      type="text"
      label="Заголовок"
      v-model.trim="noteHeader"
    ></BaseInput>
    <div class="todos-list">
      <h2>Список задач</h2>
      <NotesTodoComponent
        v-for="(todo, ind) in todos"
        :key="`${todo.id}-${ind}`"
        :todo="todo"
        createMode
        @edit="onEdit"
        @delete="deleteTodo"
      />
    </div>
    <div class="notes-form__controls">
      <BaseButton @click="addTodo" title="Добавить поле"
        ><IconsAdd
      /></BaseButton>
      <BaseButton @click="saveNote" title="Сохранить изменения">
        <IconsSave
      /></BaseButton>
    </div>
  </form>
</template>

<script setup>
import BaseButton from "../Form/BaseButton.vue";
import BaseInput from "../Form/BaseInput.vue";
import { storeNote } from "../../helpers/store.js";
import { todoModel } from "../../helpers/models.js";

const router = useRouter();
const noteHeader = ref("");
const todos = ref([{ ...todoModel, id: 0 }]);

function addTodo() {
  console.log(todos.value);
  todos.value.push({ ...todoModel, id: todos.value?.length });
}

function onEdit(id, val) {
  todos.value[id].text = val;
}
function deleteTodo(id) {
  if (todos.value.length === 1) return;
  todos.value = todos.value.filter((el) => el.id !== id);
}

function saveNote() {
  const checkEmpty = todos.value.every((todo) => !todo.text);
  if (!noteHeader.value && checkEmpty) {
    const userConfirm = confirm(
      "Вы создаёте пустую заметку, уверены, что хотите продолжить?"
    );
    if (!userConfirm) return;
  }
  todos.value = todos.value.filter((todo) => !!todo.text);
  const currentNote = {
    id: null,
    todos: [...todos.value],
    title: noteHeader.value,
  };

  storeNote(currentNote);
  router.push("/");
}
</script>

<style scoped></style>
