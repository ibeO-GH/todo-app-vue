<template>
  <section class="w-full max-w-2xl mx-auto">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-white">My Todos</h1>
      <button
        @click="toggleAddForm"
        class="px-4 py-2 bg-brand hover:bg-brand-dark text-white rounded-lg transition"
      >
        + Add Todo
      </button>
    </div>

    <AddTodoForm :isOpen="isAdding" @close="toggleAddForm" />

    <TodoList />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useTodoStore } from "@/stores/todoStore";
import TodoList from "@/components/TodoList.vue";
import AddTodoForm from "@/components/AddTodoForm.vue";

const store = useTodoStore();
const isAdding = ref(false);

onMounted(() => {
  store.loadTodos();
});

function toggleAddForm() {
  isAdding.value = !isAdding.value;
}
</script>
