import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Careers from "@/views/Careers.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/careers",
    name: "Careers",
    component: Careers,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;