<template>
  <select
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
    v-bind="$attrs"
    class="rounded-md px-3 py-2 bg-white text-gray-800 border border-gray-300"
  >
    <option v-for="opt in options" :key="String(opt.value)" :value="opt.value">
      {{ opt.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
defineProps<{
  modelValue?: string | number;
  options?: { value: string | number; label: string }[];
}>();

defineEmits(["update:modelValue"]);
</script>
