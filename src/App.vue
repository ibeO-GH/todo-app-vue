<template>
  <div class="min-h-screen bg-gray-900 text-gray-100">
    <header class="p-4 text-center text-2xl font-bold bg-gray-800 shadow">
      📝 Todo App (Vue 3 + TypeScript + Tailwind)
    </header>

    <main class="p-4">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
</script>
