<template>
  <button
    :class="[
      'btn',
      variant ? `btn-${variant}` : '',
      size ? `btn-${size}` : '',
      customClass,
    ]"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script setup>
const {
  variant = "",
  disabled = false,
  text = "",
  size = "",
  customClass = "",
} = defineProps({
  variant: String,
  size: String,
  customClass: String,
  disabled: Boolean,
  text: Boolean,
});
</script>

<style scoped></style>
