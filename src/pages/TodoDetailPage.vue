<template>
  <section class="w-full max-w-xl mx-auto">
    <TodoDetail :todo="todo" v-if="todo" />
    <p v-else class="text-gray-400 text-center mt-10">Todo not found.</p>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useTodoStore } from "@/stores/todoStore";
import TodoDetail from "@/components/TodoDetail.vue";

const route = useRoute();
const store = useTodoStore();

const todo = computed(() =>
  store.todos.find((t) => t.id === Number(route.params.id))
);
</script>
