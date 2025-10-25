<template>
  <select
    class="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
    v-bind="$attrs"
  >
    <slot />
  </select>
</template>

<script setup lang="ts">
defineProps<{
  label?: string;
  options: { value: string | number; label: string }[];
  modelValue?: string | number;
  error?: string;
}>();

defineEmits(["update:modelValue"]);
</script>
