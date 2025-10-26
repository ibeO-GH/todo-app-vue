<template>
  <div v-if="todos.length" class="space-y-4">
    <div
      v-for="todo in todos"
      :key="todo.id"
      class="p-4 bg-gray-800/70 rounded-2xl shadow-card flex justify-between items-center"
    >
      <div class="flex-1">
        <RouterLink
          :to="`/todo/${todo.id}`"
          class="block text-lg font-medium text-white hover:text-brand transition"
        >
          {{ todo.title }}
        </RouterLink>
        <p v-if="todo.description" class="text-sm text-gray-400 mt-1">
          {{ todo.description }}
        </p>
      </div>

      <div class="flex gap-2">
        <button
          @click="startEdit(todo)"
          class="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg"
        >
          Edit
        </button>
        <button
          @click="store.deleteTodo(todo.id)"
          class="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>

    <AddTodoForm
      v-if="isEditing"
      :isOpen="isEditing"
      :isEdit="true"
      :existingTodo="editingTodo"
      @close="closeEdit"
    />
  </div>

  <p v-else class="text-center text-gray-400 mt-10">
    No todos yet. Create your first one!
  </p>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useTodoStore } from "@/stores/todoStore";
import AddTodoForm from "@/components/AddTodoForm.vue";

const store = useTodoStore();
const todos = computed(() => store.todos);

const isEditing = ref(false);
const editingTodo = ref<any>(null);

function startEdit(todo: any) {
  editingTodo.value = todo;
  isEditing.value = true;
}

function closeEdit() {
  isEditing.value = false;
  editingTodo.value = null;
}
</script>
