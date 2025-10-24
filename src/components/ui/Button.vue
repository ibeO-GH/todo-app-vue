<template>
  <button
    :type="type"
    class="inline-flex items-center justify-center px-4 py-2 rounded-lg font-semibold transition-all focus:outline-none bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
    :class="{
      'bg-gray-700 hover:bg-gray-600 text-gray-300': variant === 'secondary',
      'bg-red-600 hover:bg-red-500': variant === 'danger',
    }"
    :disabled="disabled"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  onClick?: (e: MouseEvent) => void;
}>();

const {
  type = "button",
  variant = "primary",
  disabled = false,
  onClick,
} = props;
</script>
