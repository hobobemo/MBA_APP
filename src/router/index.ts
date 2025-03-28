import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomeRoutes from "./home";
import UserRoutes from "./user";
import AdminRoutes from "./admin";

const routes = [
  ...HomeRoutes,
  ...UserRoutes,
  ...AdminRoutes,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router