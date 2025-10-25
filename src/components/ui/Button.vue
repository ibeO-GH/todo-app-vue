<template>
  <button
    :class="[
      'px-4 py-2 font-medium rounded-lg transition-colors',
      variant === 'primary' && 'bg-blue-600 hover:bg-blue-700 text-white',
      variant === 'secondary' && 'bg-gray-700 hover:bg-gray-600 text-white',
      variant === 'danger' && 'bg-red-600 hover:bg-red-700 text-white',
    ]"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps({
  variant: {
    type: String,
    default: "primary",
  },
});
</script>
