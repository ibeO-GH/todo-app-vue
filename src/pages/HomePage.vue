<template>
  <div
    class="min-h-screen bg-background text-foreground flex flex-col items-center px-4 py-8"
  >
    <div
      class="w-full max-w-md bg-card border border-border rounded-xl p-6 shadow-lg"
    >
      <h1 class="text-2xl font-bold mb-6 text-center">My Todo App</h1>

      <!-- Add Todo Form -->
      <form @submit.prevent="addTodo" class="space-y-4">
        <Input
          label="Task Title"
          placeholder="Enter todo title..."
          v-model="newTodo.title"
          :error="errors.title"
        />

        <Input
          label="Description"
          placeholder="Enter task description..."
          v-model="newTodo.description"
          :error="errors.description"
        />

        <Select
          label="Status"
          :options="statusOptions"
          v-model="newTodo.status"
        />

        <Button type="submit" variant="primary" class="w-full">
          Add Todo
        </Button>
      </form>
    </div>

    <!-- Todo List -->
    <div class="w-full max-w-md mt-10">
      <TodoList :todos="todos" @toggle="toggleTodo" @delete="deleteTodo" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Input from "@/components/ui/Input.vue";
import Button from "@/components/ui/Button.vue";
import Select from "@/components/ui/Select.vue";
import TodoList from "@/components/TodoList.vue";
import type { Todo } from "@/types/todo";

const todos = ref<Todo[]>([]);
const newTodo = ref({
  title: "",
  description: "",
  status: "pending",
});

const errors = ref({
  title: "",
  description: "",
});

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
];

function validate() {
  errors.value.title = newTodo.value.title.trim() ? "" : "Title is required.";
  return !errors.value.title;
}

function addTodo() {
  if (!validate()) return;

  const todo: Todo = {
    id: Date.now(),
    title: newTodo.value.title,
    description: newTodo.value.description,
    completed: newTodo.value.status === "completed",
    createdAt: new Date().toISOString(),
  };

  todos.value.unshift(todo);
  newTodo.value = { title: "", description: "", status: "pending" };
}

function toggleTodo(id: number) {
  const todo = todos.value.find((t) => t.id === id);
  if (todo) todo.completed = !todo.completed;
}

function deleteTodo(id: number) {
  todos.value = todos.value.filter((t) => t.id !== id);
}
</script>
