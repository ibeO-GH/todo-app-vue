<template>
  <section
    class="w-full max-w-3xl mx-auto mt-10 p-8 rounded-2xl shadow-card bg-slate-800/70 backdrop-blur-md"
  >
    <div class="flex items-center gap-2 mb-6">
      <span class="text-2xl">📝</span>
      <h2 class="text-2xl font-bold text-gray-100">Todo Details</h2>
    </div>

    <div v-if="todo" class="space-y-4">
      <p class="text-gray-400">ID: {{ todo.id }}</p>

      <div>
        <label class="block mb-2 text-sm font-medium text-gray-300"
          >Title</label
        >
        <UiInput v-model="todo.title" readonly />
      </div>

      <div>
        <label class="block mb-2 text-sm font-medium text-gray-300"
          >Status</label
        >
        <span
          :class="[
            'inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border',
            todo.completed
              ? 'border-green-500 text-green-400 bg-green-500/10'
              : 'border-yellow-500 text-yellow-400 bg-yellow-500/10',
          ]"
        >
          <input
            type="checkbox"
            v-model="todo.completed"
            disabled
            class="w-4 h-4"
          />
          {{ todo.completed ? "Completed" : "Pending" }}
        </span>
      </div>

      <UiButton variant="secondary" @click="$router.push('/')"
        >← Back to List</UiButton
      >
    </div>

    <p v-else class="text-gray-400 text-center">Todo not found.</p>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useTodoStore } from "@/stores/todoStore";
import UiButton from "@/components/ui/Button.vue";
import UiInput from "@/components/ui/Input.vue";

const route = useRoute();
const store = useTodoStore();

const todo = computed(() =>
  store.todos.find((t) => t.id === Number(route.params.id))
);
</script>
