<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { db } from "@/db/todoDb";
import type { Todo } from "@/types/todo";
import TodoItem from "./TodoItem.vue";
import Pagination from "./Pagination.vue";

const todos = ref<Todo[]>([]);
const searchTerm = ref("");
const currentPage = ref(1);
const itemsPerPage = 10;
const loading = ref(true);
const error = ref<string | null>(null);

// Fetch todos from Dexie (IndexedDB)
const fetchTodos = async () => {
  try {
    loading.value = true;
    const allTodos = await db.todos.toArray();

    // Fallback to demo data if none exist
    if (allTodos.length === 0) {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=30"
      );
      const data: Todo[] = await res.json();
      await db.todos.bulkAdd(data);
      todos.value = data.reverse();
    } else {
      todos.value = allTodos.reverse();
    }
  } catch (err) {
    error.value = "Failed to load todos.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// Add new todo
const newTitle = ref("");
const addTodo = async () => {
  if (!newTitle.value.trim()) return;
  const newTodo: Todo = {
    id: Date.now(),
    title: newTitle.value.trim(),
    completed: false,
    userId: 1,
  };
  await db.todos.add(newTodo);
  todos.value.unshift(newTodo);
  newTitle.value = "";
};

// Delete todo
const deleteTodo = async (id: number) => {
  await db.todos.delete(id);
  todos.value = todos.value.filter((t) => t.id !== id);
};

// Filter + Pagination
const filteredTodos = computed(() => {
  return todos.value.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const paginatedTodos = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredTodos.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() =>
  Math.ceil(filteredTodos.value.length / itemsPerPage)
);

onMounted(fetchTodos);
</script>

<template>
  <section class="max-w-3xl mx-auto py-12 px-4">
    <h1 class="text-3xl font-bold text-center text-blue-200 mb-6">
      📝 Todo List
    </h1>

    <!-- Search & Add Form -->
    <div class="flex flex-col sm:flex-row gap-3 mb-6">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Search todos..."
        class="flex-1 rounded-lg bg-gray-800 text-gray-200 px-4 py-2 border border-gray-700 focus:ring-2 focus:ring-blue-500"
      />
      <form
        @submit.prevent="addTodo"
        class="flex flex-row gap-3 w-full sm:w-auto"
      >
        <input
          v-model="newTitle"
          type="text"
          placeholder="Add new todo..."
          class="flex-1 rounded-lg bg-gray-800 text-gray-200 px-4 py-2 border border-gray-700 focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
        >
          Add
        </button>
      </form>
    </div>

    <!-- Status -->
    <p v-if="loading" class="text-gray-400 text-center animate-pulse mt-6">
      Loading...
    </p>
    <p v-if="error" class="text-red-500 text-center font-semibold mt-6">
      {{ error }}
    </p>

    <!-- Todo List -->
    <div v-if="!loading && !error" class="space-y-3">
      <TodoItem
        v-for="todo in paginatedTodos"
        :key="todo.id"
        :todo="todo"
        @delete-todo="deleteTodo"
      />
    </div>

    <!-- Pagination -->
    <Pagination
      v-if="!loading && totalPages > 1"
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-change="currentPage = $event"
      class="mt-6"
    />
  </section>
</template>

<style scoped>
section {
  background: linear-gradient(135deg, #0f172a, #1e293b);
  border-radius: 1rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}
</style>
