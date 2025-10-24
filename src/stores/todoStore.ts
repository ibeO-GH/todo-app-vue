import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
import { db } from "@/db/todoDb";
import type { Todo } from "@/types/todo";

export const useTodoStore = defineStore("todoStore", () => {
  const todos = ref<Todo[]>([]);

  onMounted(async () => {
    const all = await db.todos.toArray();
    todos.value = all;
  });

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

  return { todos, addTodo, deleteTodo, toggleTodo };
});
