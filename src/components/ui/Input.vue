<template>
  <input
    class="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
defineProps<{
  label?: string;
  placeholder?: string;
  type?: string;
  modelValue?: string;
  error?: string;
}>();

defineEmits(["update:modelValue"]);
</script>
