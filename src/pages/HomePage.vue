<template>
  <section
    class="w-full max-w-4xl mx-auto mt-10 p-6 rounded-2xl shadow-card bg-slate-800/70 backdrop-blur-md"
  >
    <!-- Header Row -->
    <div class="flex flex-wrap gap-3 items-center justify-between mb-6">
      <UiInput
        v-model="searchTerm"
        placeholder="Search todos..."
        class="flex-1"
      />

      <!-- Fixed: Added `options` prop -->
      <UiSelect v-model="filterStatus" :options="filterOptions" class="w-48" />

      <UiButton
        @click="toggleAddForm"
        variant="success"
        class="flex items-center gap-2"
      >
        <span class="text-lg">+</span>
        {{ showAddForm ? "Close" : "Add Todo" }}
      </UiButton>
    </div>

    <!-- Inline Add Todo Form -->
    <div v-if="showAddForm" class="bg-gray-900 p-5 rounded-xl mb-6">
      <label class="block mb-2 text-sm font-medium text-gray-300">Title</label>
      <UiInput v-model="newTodoTitle" placeholder="Enter todo title..." />

      <div class="flex gap-3 mt-4">
        <UiButton variant="primary" @click="saveNewTodo">Add</UiButton>
        <UiButton variant="secondary" @click="toggleAddForm">Cancel</UiButton>
      </div>
    </div>

    <!-- Todo List -->
    <div v-if="filteredTodos.length > 0" class="space-y-5">
      <div
        v-for="todo in filteredTodos"
        :key="todo.id"
        class="p-5 rounded-2xl shadow-card bg-gray-800 flex flex-col gap-4"
      >
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold text-blue-400">{{ todo.title }}</h2>

          <div class="flex gap-3 items-center">
            <span
              :class="[
                'text-sm font-medium px-3 py-1 rounded-full border',
                todo.completed
                  ? 'border-green-500 text-green-400 bg-green-500/10'
                  : 'border-yellow-500 text-yellow-400 bg-yellow-500/10',
              ]"
            >
              {{ todo.completed ? "Completed" : "Pending" }}
            </span>

            <UiButton variant="primary" @click="startEdit(todo)">Edit</UiButton>
            <UiButton variant="danger" @click="remove(todo.id)"
              >Delete</UiButton
            >
          </div>
        </div>

        <!-- Inline Edit Form -->
        <div
          v-if="editingTodo?.id === todo.id"
          class="bg-gray-900 p-4 rounded-xl"
        >
          <label class="block mb-2 text-sm font-medium text-gray-300">
            Title
          </label>
          <UiInput v-model="editingTodo.title" />

          <div class="flex items-center gap-2 mt-3">
            <input
              type="checkbox"
              v-model="editingTodo.completed"
              class="w-4 h-4"
            />
            <span class="text-gray-300">Completed</span>
          </div>

          <div class="flex gap-3 mt-4">
            <UiButton variant="primary" @click="saveEdit">Save</UiButton>
            <UiButton variant="secondary" @click="cancelEdit">Cancel</UiButton>
          </div>
        </div>
      </div>
    </div>

    <p v-else class="text-center text-gray-400 mt-8">No todos found.</p>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useTodoStore } from "@/stores/todoStore";
import UiButton from "@/components/ui/Button.vue";
import UiInput from "@/components/ui/Input.vue";
import UiSelect from "@/components/ui/Select.vue";
import type { Todo } from "@/types/todo";

const store = useTodoStore();

const searchTerm = ref("");
const filterStatus = ref("all");
const editingTodo = ref<Todo | null>(null);
const showAddForm = ref(false);
const newTodoTitle = ref("");

// Select options for filtering
const filterOptions = [
  { value: "all", label: "All" },
  { value: "completed", label: "Completed" },
  { value: "incomplete", label: "Incomplete" },
];

const filteredTodos = computed(() => {
  return store.todos.filter((t) => {
    const matchesSearch = t.title
      .toLowerCase()
      .includes(searchTerm.value.toLowerCase());
    const matchesFilter =
      filterStatus.value === "all" ||
      (filterStatus.value === "completed" && t.completed) ||
      (filterStatus.value === "incomplete" && !t.completed);
    return matchesSearch && matchesFilter;
  });
});

// Inline Add Todo logic
function toggleAddForm() {
  showAddForm.value = !showAddForm.value;
}

async function saveNewTodo() {
  if (!newTodoTitle.value.trim()) return;
  await store.addTodo(newTodoTitle.value.trim());
  newTodoTitle.value = "";
  showAddForm.value = false;
}

// Edit Todo logic
function startEdit(todo: Todo) {
  editingTodo.value = { ...todo };
}

async function saveEdit() {
  if (editingTodo.value) {
    await store.updateTodo(editingTodo.value.id, editingTodo.value);
    editingTodo.value = null;
  }
}

function cancelEdit() {
  editingTodo.value = null;
}

// Delete
async function remove(id: number) {
  if (confirm("Are you sure you want to delete this todo?")) {
    await store.deleteTodo(id);
  }
}
</script>
