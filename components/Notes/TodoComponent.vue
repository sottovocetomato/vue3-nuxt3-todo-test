<template>
  <div class="todo">
    <div class="todo__body">
      <BaseCheckbox v-model="todoDone" />
      <div class="todo__text">
        <BaseInput v-if="editing" type="text" v-model="todoText"></BaseInput>
        <span v-else>{{ todoText }}</span>
      </div>
    </div>

    <div class="todo__controls">
      <BaseButton v-if="!editing" @click="toggleEdit"
        ><IconsEdit />
      </BaseButton>
      <BaseButton v-else @click="onEditEnd"><IconsSave /></BaseButton>
      <BaseButton variant="danger" @click="deleteTodo"
        ><IconsDelete
      /></BaseButton>
    </div>
  </div>
</template>

<script setup>
import BaseCheckbox from "../Form/BaseCheckbox.vue";
import BaseInput from "../Form/BaseInput.vue";
import BaseButton from "../Form/BaseButton.vue";

const emit = defineEmits(["edit", "delete"]);

const { todo = {} } = defineProps({
  todo: Object,
});

const editing = ref(false);
const todoTextVal = ref("");

const todoText = computed({
  get() {
    return todo.text;
  },
  set(newValue) {
    todoTextVal.value = newValue;
  },
});

const todoDone = computed({
  get() {
    return todo.done;
  },
  set(newValue) {
    emit("edit", todo.id, { text: todo.text, done: newValue });
  },
});

function toggleEdit() {
  editing.value = !editing.value;
}

function onEditEnd() {
  if (todoTextVal.value) {
    emit("edit", todo.id, {
      text: todoTextVal.value,
      done: todo.done,
    });
  }

  toggleEdit();
}

function deleteTodo() {
  emit("delete", todo.id);
}
</script>

<style scoped></style>
