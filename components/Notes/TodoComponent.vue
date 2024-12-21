<template>
  <div class="todo">
    <div class="todo__body">
      <BaseCheckbox v-model="todoDone" v-if="!createMode" />
      <div class="todo__text">
        <BaseInput
          v-if="createMode || editing"
          type="text"
          v-model="todoText"
        ></BaseInput>
        <span v-else>{{ todoText }}</span>
      </div>
    </div>

    <div class="todo__controls">
      <template v-if="!createMode">
        <BaseButton v-if="!editing" variant="warning" @click="toggleEdit">
          <IconsEdit />
        </BaseButton>
        <BaseButton v-else variant="warning" @click="onEditEnd">
          <IconsSave />
        </BaseButton>
      </template>
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

const { todo = {}, createMode = false } = defineProps({
  todo: Object,
  createMode: Boolean,
});
console.log(todo);
const editing = ref(todo?.new);
const todoTextVal = ref("");

const todoText = computed({
  get() {
    return todo.text;
  },
  set(newValue) {
    if (createMode) {
      emit("edit", todo.id, newValue?.trim());
      return;
    }
    todoTextVal.value = newValue?.trim();
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
