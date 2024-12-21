<template>
  <button
    :id="uid"
    :class="[
      'btn',
      variant ? `btn-${variant}` : '',
      size ? `btn-${size}` : '',
      customClass,
    ]"
    :disabled="disabled"
    :type="type"
  >
    <slot></slot>
  </button>
</template>

<script setup>
const uid = useId();
const {
  variant = "",
  disabled = false,
  text = "",
  type = "button",
  size = "",
  customClass = "",
} = defineProps({
  variant: String,
  size: String,
  type: String,
  customClass: String,
  disabled: Boolean,
  text: Boolean,
});
</script>

<style scoped></style>
