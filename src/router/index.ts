// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/pages/HomePage.vue";
import TodoDetailPage from "@/pages/TodoDetailPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomePage,
    },
    {
      path: "/todo/:id",
      name: "TodoDetail",
      component: TodoDetailPage,
      props: true,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFoundPage,
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});
