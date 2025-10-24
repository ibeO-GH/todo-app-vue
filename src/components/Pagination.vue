<template>
  <div class="flex justify-center items-center space-x-3 mt-6">
    <button
      class="px-4 py-2 bg-gray-700 text-gray-100 rounded disabled:opacity-50"
      :disabled="currentPage === 1"
      @click="$emit('page-change', currentPage - 1)"
    >
      ◀ Prev
    </button>

    <span class="text-gray-300">
      Page {{ currentPage }} / {{ totalPages }}
    </span>

    <button
      class="px-4 py-2 bg-gray-700 text-gray-100 rounded disabled:opacity-50"
      :disabled="currentPage === totalPages"
      @click="$emit('page-change', currentPage + 1)"
    >
      Next ▶
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentPage: number;
  totalPages: number;
}>();

defineEmits<{
  (e: "page-change", page: number): void;
}>();
</script>
