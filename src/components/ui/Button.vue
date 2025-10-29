<template>
  <button :class="btnClass" v-bind="$attrs" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String as () => "primary" | "secondary" | "success" | "danger",
    default: "primary",
  },
});

const btnClass = computed(() => {
  const base = "px-4 py-2 rounded-md font-semibold shadow-sm";
  if (props.variant === "primary") return base + " bg-blue-600 text-white";
  if (props.variant === "secondary") return base + " bg-gray-600 text-white";
  if (props.variant === "success") return base + " bg-green-600 text-white";
  if (props.variant === "danger") return base + " bg-red-600 text-white";
  return base;
});

defineEmits(["click"]);
</script>
