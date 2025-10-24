<template>
  <div class="flex flex-col space-y-1 w-full">
    <label v-if="label" class="text-gray-300 font-medium">{{ label }}</label>
    <input
      v-bind="$attrs"
      :type="type"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      class="px-4 py-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition w-full"
      :placeholder="placeholder"
    />
    <p v-if="error" class="text-sm text-red-500 mt-1">{{ error }}</p>
  </div>
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
