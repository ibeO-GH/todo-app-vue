<template>
  <div class="min-h-screen flex flex-col">
    <header
      class="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg"
    >
      <span class="text-2xl">📝</span>
      <h1 class="text-2xl font-bold text-white">MyTodo</h1>
    </header>

    <main class="flex-grow flex justify-center py-10">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
</script>
