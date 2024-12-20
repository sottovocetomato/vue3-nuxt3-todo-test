<template>
  <div class="checkbox-wrap">
    <label v-if="label">{{ label }}</label>
    <input
      :class="customClass || 'input-group base-checkbox'"
      v-model="model"
      :checked="checked"
      type="checkbox"
      :disabled="disabled"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup>
const model = defineModel();
const {
  disabled = false,
  checked = false,
  customClass = "",
  placeholder = "",
  label = "",
} = defineProps({
  disabled: Boolean,
  checked: Boolean,
  placeholder: String,
  customClass: String,
  label: String,
});
</script>

<style scoped></style>
