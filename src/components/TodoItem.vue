<template>
  <div
    class="flex items-center justify-between bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-sm hover:bg-gray-750 transition"
  >
    <div
      class="flex items-center space-x-3 cursor-pointer"
      @click="$emit('view', todo.id)"
    >
      <input
        type="checkbox"
        class="accent-blue-500"
        :checked="todo.completed"
        @change="$emit('toggle', todo.id)"
      />
      <span
        :class="todo.completed ? 'line-through text-gray-400' : 'text-gray-100'"
      >
        {{ todo.title }}
      </span>
    </div>

    <button
      class="text-red-400 hover:text-red-300 font-semibold"
      @click.stop="$emit('delete', todo.id)"
    >
      ✖
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Todo } from "@/types/todo";

defineProps<{
  todo: Todo;
}>();

defineEmits<{
  (e: "delete", id: number): void;
  (e: "toggle", id: number): void;
  (e: "view", id: number): void;
}>();
</script>
