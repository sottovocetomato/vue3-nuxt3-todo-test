<template>
  <div>
    <div>
      <NuxtLoadingIndicator />
      <NuxtRouteAnnouncer />
      <NuxtErrorBoundary @error="errorLogger">
        <template #error="{ error }">
          <p>An error occurred: {{ error }}</p>
        </template>
        <NuxtPage />
      </NuxtErrorBoundary>
    </div>
  </div>
</template>
<script setup>
function errorLogger(error) {
  console.error(error, "Some error has occured on app level");
}
</script>
