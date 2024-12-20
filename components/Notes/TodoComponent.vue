<template>
  <div class="todo">
    <BaseCheckbox v-model="todo.done" />
    <div class="todo__text">
      <BaseInput v-if="editing" type="text" v-model="todo.text"></BaseInput>
      <span v-else>{{ todo.text }}</span>
    </div>

    <div class="todo__controls">
      <BaseButton v-if="!editing" @click="toggleEdit"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      </BaseButton>
      <BaseButton v-else @click="saveEdited">Сохранить</BaseButton>
      <BaseButton variant="danger" @click="deleteTodo">Удалить</BaseButton>
    </div>
  </div>
</template>

<script setup>
import BaseCheckbox from "../Form/BaseCheckbox.vue";
import BaseInput from "../Form/BaseInput.vue";
import BaseButton from "../Form/BaseButton.vue";

const emit = defineEmits(["submit", "delete"]);

const { todo = {} } = defineProps({
  todo: Object,
});

const editing = ref(false);

function toggleEdit() {
  editing.value = !editing.value;
}

function saveEdited() {
  emit("submit");
  toggleEdit();
}
function deleteTodo() {
  emit("delete");
}
</script>

<style scoped></style>
