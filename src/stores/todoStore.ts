import { defineStore } from "pinia";
import { ref } from "vue";
import { db } from "@/db/todoDb";
import type { Todo } from "@/types/todo";

export const useTodoStore = defineStore("todoStore", () => {
  const todos = ref<Todo[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function loadTodos() {
    try {
      loading.value = true;
      const all = await db.todos.toArray();
      todos.value = all.reverse();
    } catch (err) {
      error.value = "Failed to load todos.";
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  async function addTodo(title: string) {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
    };
    await db.todos.add(newTodo);
    todos.value.unshift(newTodo);
  }

  async function deleteTodo(id: number) {
    await db.todos.delete(id);
    todos.value = todos.value.filter((t) => t.id !== id);
  }

  async function toggleTodo(id: number) {
    const todo = todos.value.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      await db.todos.put(todo);
    }
  }

  async function updateTodo(id: number, updatedData: Partial<Todo>) {
    const index = todos.value.findIndex((t) => t.id === id);
    if (index !== -1) {
      const updatedTodo = { ...todos.value[index], ...updatedData };
      todos.value[index] = updatedTodo;
      await db.todos.put(updatedTodo);
    }
  }

  return {
    todos,
    loading,
    error,
    loadTodos,
    addTodo,
    deleteTodo,
    toggleTodo,
    updateTodo,
  };
});
