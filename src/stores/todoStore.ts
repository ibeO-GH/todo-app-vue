import { defineStore } from "pinia";
import { ref } from "vue";
import { db } from "@/db/todoDb";
import type { Todo } from "@/types/todo";

export const useTodoStore = defineStore("todo", () => {
  const todos = ref<Todo[]>([]);

  async function loadTodos() {
    try {
      const local = await db.todos.toArray();
      if (local.length > 0) {
        todos.value = local;
      } else {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=10"
        );
        const data: Todo[] = await response.json();
        todos.value = data;
        await db.todos.bulkPut(data);
      }
    } catch (err) {
      console.error("Failed to load todos:", err);
    }
  }

  async function addTodo(title: string) {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
      userId: 1,
    };
    await db.todos.add(newTodo);
    todos.value = [newTodo, ...todos.value]; // reassign to trigger reactivity
  }

  async function updateTodo(updated: Todo) {
    const index = todos.value.findIndex((t) => t.id === updated.id);
    if (index !== -1) {
      todos.value[index] = { ...updated };
      await db.todos.put(todos.value[index]);
      todos.value = [...todos.value]; // refresh array
    }
  }

  async function deleteTodo(id: number) {
    await db.todos.delete(id);
    todos.value = todos.value.filter((t) => t.id !== id);
  }

  return { todos, loadTodos, addTodo, updateTodo, deleteTodo };
});
