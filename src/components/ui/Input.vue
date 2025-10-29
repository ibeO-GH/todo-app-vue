<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    v-bind="$attrs"
    class="w-full rounded-md px-3 py-2 bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</template>

<script setup lang="ts">
defineProps<{ modelValue?: string }>();
defineEmits(["update:modelValue"]);
</script>
