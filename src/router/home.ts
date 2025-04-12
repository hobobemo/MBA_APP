import Default from '@/layouts/default.vue';
import { authGuard } from "./authGuard";

const homeRoutes = [
  {
    path: '/', 
    redirect: '/index',
    beforeEnter: authGuard 
  }, {
    path: '/index',
    meta: { layout: Default },
    component: () => import('@/views/index.vue'),
    beforeEnter: authGuard 
  }, {
    path: '/about',
    meta: { layout: Default },
    component: () => import('@/views/front/about.vue')
  },
];

export default homeRoutes;