<template>
  <div class="input-wrap">
    <label v-if="label">{{ label }}</label>
    <input
      :class="customClass || 'input-group base-input'"
      v-model="model"
      maxlength="255"
      minlength="1"
      :type="type"
      :disabled="disabled"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup>
const model = defineModel();
const {
  type = "text",
  disabled = false,
  customClass = "",
  placeholder = "",
  label = "",
} = defineProps({
  type: String,
  disabled: Boolean,
  placeholder: String,
  customClass: String,
  label: String,
});
console.log(type, "type");
</script>

<style scoped></style>
