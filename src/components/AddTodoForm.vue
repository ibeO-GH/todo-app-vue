<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="mt-4 p-6 bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-card"
    >
      <h2 class="text-lg font-semibold text-white mb-4">
        {{ isEdit ? "Edit Todo" : "Add New Todo" }}
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <input
          v-model="title"
          type="text"
          placeholder="Enter title..."
          class="w-full px-4 py-2 bg-gray-900/60 text-white rounded-lg border border-gray-700 focus:border-brand outline-none"
          required
        />
        <textarea
          v-model="description"
          placeholder="Enter description (optional)"
          class="w-full px-4 py-2 bg-gray-900/60 text-white rounded-lg border border-gray-700 focus:border-brand outline-none min-h-[100px]"
        ></textarea>

        <div class="flex items-center justify-end gap-3">
          <button
            type="button"
            @click="close"
            class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-sm text-white rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            class="px-4 py-2 bg-brand hover:bg-brand-dark text-sm font-semibold text-white rounded-lg"
          >
            {{ isEdit ? "Save Changes" : "Add Todo" }}
          </button>
        </div>
      </form>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useTodoStore } from "@/stores/todoStore";

const props = defineProps<{
  isOpen: boolean;
  isEdit?: boolean;
  existingTodo?: {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
  };
}>();

const emit = defineEmits(["close"]);

const store = useTodoStore();
const title = ref("");
const description = ref("");

watch(
  () => props.existingTodo,
  (todo) => {
    if (todo) {
      title.value = todo.title;
      description.value = todo.description || "";
    }
  },
  { immediate: true }
);

function handleSubmit() {
  if (props.isEdit && props.existingTodo) {
    store.updateTodo(props.existingTodo.id, {
      title: title.value,
      description: description.value,
    });
  } else {
    store.addTodo({
      title: title.value,
      description: description.value,
    });
  }

  title.value = "";
  description.value = "";
  emit("close");
}

function close() {
  emit("close");
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
