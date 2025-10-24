<template>
  <div class="flex flex-col space-y-1 w-full">
    <label v-if="label" class="text-gray-300 font-medium">{{ label }}</label>
    <select
      v-bind="$attrs"
      :value="modelValue"
      @change="
        $emit('update:modelValue', ($event.target as HTMLSelectElement).value)
      "
      class="px-4 py-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition w-full"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <p v-if="error" class="text-sm text-red-500 mt-1">{{ error }}</p>
  </div>
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
