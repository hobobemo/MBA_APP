import Default from '@/layouts/default.vue';
import { authGuard } from "./authGuard";

const homeRoutes = [
  {
    path: '/', 
    redirect: '/index',
  }, {
    path: '/index',
    meta: { layout: Default },
    component: () => import('@/views/index.vue'),
  }, {
    path: '/about',
    meta: { layout: Default },
    component: () => import('@/views/front/about.vue')
  },
];

export default homeRoutes;