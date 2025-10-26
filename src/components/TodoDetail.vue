<template>
  <div class="p-6 bg-gray-800/70 rounded-2xl shadow-card">
    <h2 class="text-2xl font-semibold text-white mb-2">{{ todo.title }}</h2>
    <p v-if="todo.description" class="text-gray-300 mb-4">
      {{ todo.description }}
    </p>
    <p class="text-sm text-gray-400">
      Created: {{ formatDate(todo.createdAt) }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type { TodoDetail } from "@/types/todo";

defineProps<{ todo: TodoDetail }>();

function formatDate(date: string | number | Date) {
  return new Date(date).toLocaleString();
}
</script>
