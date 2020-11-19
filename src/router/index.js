import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Careers from "@/views/Careers.vue";
import CareerDetails from "@/views/CareerDetails.vue";
import NotFound from "@/views/NotFound.vue";
import Login from "@/views/Login.vue";
import NewTestimony from "@/views/NewTestimony.vue";

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
  {
    path: "/careers/:careerName",
    name: ":CareerName",
    component: CareerDetails,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/careers/:careerName/new-testimony",
    name: ":CareerName Testimony",
    component: NewTestimony,
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: 'not-found', 
    component: NotFound 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;