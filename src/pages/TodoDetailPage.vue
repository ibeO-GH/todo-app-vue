<template>
  <section class="py-12 px-4">
    <TodoDetail :id="id" />
  </section>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import TodoDetail from "@/components/TodoDetail.vue";

const route = useRoute();
const id = route.params.id as string;
</script>
