<template>
  <div v-if="todos.length" class="space-y-4">
    <div
      v-for="todo in todos"
      :key="todo.id"
      class="bg-card border border-border rounded-lg p-4 flex flex-col gap-2 shadow-md"
    >
      <div class="flex justify-between items-center">
        <h2
          class="text-lg font-semibold"
          :class="
            todo.completed ? 'line-through text-gray-500' : 'text-foreground'
          "
        >
          {{ todo.title }}
        </h2>

        <div class="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            @click="$emit('toggle', todo.id)"
          >
            {{ todo.completed ? "Undo" : "Done" }}
          </Button>

          <Button variant="danger" size="sm" @click="$emit('delete', todo.id)">
            Delete
          </Button>
        </div>
      </div>

      <p v-if="todo.description" class="text-sm text-muted-foreground">
        {{ todo.description }}
      </p>
      <small class="text-xs text-gray-400"
        >Created: {{ formatDate(todo.createdAt) }}</small
      >
    </div>
  </div>

  <p v-else class="text-center text-gray-500 mt-6">
    No todos yet. Add one above!
  </p>
</template>

<script setup lang="ts">
import Button from "@/components/ui/Button.vue";
import type { Todo } from "@/types/todo";

defineProps<{
  todos: Todo[];
}>();

defineEmits(["toggle", "delete"]);

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleString();
}
</script>
