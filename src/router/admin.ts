import Default from '@/layouts/default.vue';
import { authGuard } from "./authGuard";

const adminRoutes = [
    { 
        path: "/admin/articles", 
        meta: { layout: Default },
        component: () => import('@/views/admin/article.vue'),
        beforeEnter: authGuard 
    }, { 
        path: "/admin/users", 
        meta: { layout: Default },
        component: () => import('@/views/admin/users.vue'),
        beforeEnter: authGuard 
    }, { 
        path: "/admin/sponsors", 
        meta: { layout: Default },
        component: () => import('@/views/admin/sponsors.vue'),
        beforeEnter: authGuard 
    }, { 
        path: "/admin/map", 
        meta: { layout: Default },
        component: () => import('@/views/admin/map.vue'),
        beforeEnter: authGuard 
    }, { 
        path: "/admin/notifications", 
        meta: { layout: Default },
        component: () => import('@/views/admin/notification.vue'),
        beforeEnter: authGuard 
    }, { 
        path: "/admin/chat", 
        meta: { layout: Default },
        component: () => import('@/views/admin/chat.vue'),
        beforeEnter: authGuard 
    },
];

export default adminRoutes;