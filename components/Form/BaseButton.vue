<template>
  <button
    :class="['btn', variant ? `btn-${variant}` : '', customClass]"
    :disabled="disabled"
  >
    {{ text }}
  </button>
</template>

<script setup>
const {
  variant = "",
  disabled = false,
  text = "",
  customClass = "",
} = defineProps({
  variant: String,
  customClass: String,
  disabled: Boolean,
  text: Boolean,
});
</script>

<style scoped></style>
