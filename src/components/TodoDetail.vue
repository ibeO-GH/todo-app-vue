<template>
  <div
    v-if="todo"
    class="bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-2xl mx-auto shadow-xl space-y-6"
  >
    <h2 class="text-2xl font-bold text-blue-100">📝 Todo Details</h2>
    <p>ID: {{ todo.id }}</p>
    <p>Title: {{ todo.title }}</p>
    <p>Status: {{ todo.completed ? "✅ Completed" : "❌ Incomplete" }}</p>
    <button
      class="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded"
      @click="$router.back()"
    >
      ← Back
    </button>
  </div>

  <p v-else class="text-center text-gray-400 mt-10 animate-pulse">Loading...</p>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { db } from "@/db/todoDb";
import type { Todo } from "@/types/todo";

const props = defineProps<{ id: string }>();
const todo = ref<Todo | null>(null);

onMounted(async () => {
  const data = await db.todos.get(Number(props.id));
  if (data) todo.value = data;
});
</script>
