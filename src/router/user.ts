import Default from '@/layouts/default.vue';
import { authGuard } from "./authGuard";

const userRoutes = [
  {
    path: '/user',
    meta: { layout: Default },
    component: () => import('@/views/user/user.vue'),
    beforeEnter: authGuard 
  }, {
    path: '/settings',
    meta: { layout: Default },
    component: () => import('@/views/user/settings.vue'),
    beforeEnter: authGuard 
  }, {
    path: '/map',
    meta: { layout: Default },
    component: () => import('@/views/tourney/map.vue'),
    beforeEnter: authGuard 
  }, {
    path: '/bracket/:event/:div',
    meta: { layout: Default },
    component: () => import('@/views/tourney/bracket.vue'),
    beforeEnter: authGuard 
  }, {
    path: '/schedule',
    meta: { layout: Default },
    component: () => import('@/views/tourney/schedule.vue'),
    beforeEnter: authGuard 
  }, {
    path: '/sponsors',
    meta: { layout: Default },
    component: () => import('@/views/sponsors/sponsors.vue'),
    beforeEnter: authGuard 
  }, {
    path: '/teams',
    meta: { layout: Default },
    component: () => import('@/views/teams/list.vue'),
    beforeEnter: authGuard 
  }, {
    path: '/teams/:id',
    meta: { layout: Default },
    component: () => import('@/views/teams/eventList.vue'),
    beforeEnter: authGuard 
  }, {
    path: '/team/:id',
    meta: { layout: Default },
    component: () => import('@/views/teams/team.vue'),
    beforeEnter: authGuard 
  }, {
    path: '/bylaws',
    meta: { layout: Default },
    component: () => import('@/views/front/bylaws.vue'),
    beforeEnter: authGuard 
  }, {
    path: '/history',
    meta: { layout: Default },
    component: () => import('@/views/front/history.vue'),
    beforeEnter: authGuard 
  }, {
    path: '/weather',
    meta: { layout: Default },
    component: () => import('@/views/front/weather.vue'),
    beforeEnter: authGuard 
  }, {
    path: '/food',
    meta: { layout: Default },
    component: () => import('@/views/food/items.vue'),
    beforeEnter: authGuard 
  }, {
    path: '/food-checkout',
    meta: { layout: Default },
    component: () => import('@/views/food/checkout.vue'),
    beforeEnter: authGuard 
  },{
    path: '/store',
    meta: { layout: Default },
    component: () => import('@/views/store/items.vue'),
    beforeEnter: authGuard 
  }, {
    path: '/store-checkout',
    meta: { layout: Default },
    component: () => import('@/views/store/checkout.vue'),
    beforeEnter: authGuard 
  }, {
    path: '/fields',
    meta: { layout: Default },
    component: () => import('@/views/tourney/fields.vue'),
    beforeEnter: authGuard 
  }, {
    path: '/blog',
    meta: { layout: Default },
    component: () => import('@/views/blog/index.vue'),
    beforeEnter: authGuard 
  }, {
    path: '/article/:id',
    meta: { layout: Default },
    component: () => import('@/views/blog/article.vue'),
    beforeEnter: authGuard 
  }, {
    path: '/field/:id',
    meta: { layout: Default },
    component: () => import('@/views/tourney/field.vue'),
    beforeEnter: authGuard 
  },
];

export default userRoutes;