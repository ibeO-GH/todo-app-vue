import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import TodoDetailPage from "@/pages/TodoDetailPage.vue";

const routes = [
  { path: "/", name: "home", component: HomePage },
  {
    path: "/todos/:id",
    name: "todo-detail",
    component: TodoDetailPage,
    props: true,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
