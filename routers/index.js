import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/Login.vue';
import PendingRequestView from '../views/PendingRequest.vue';
import ProcessingRequestView from '../views/ProcessingRequest.vue';
import ProcessedRequestView from '../views/ProcessedRequest.vue';
import AdminDashboardView from '../views/AdminDashboard.vue';
import LeaderDashboardView from '../views/LeaderDashboard.vue';

const routes = [
    { path: '/', name: 'Login', component: LoginView },
    {
        path: '/pendingrequest',
        name: 'PendingRequest',
        component: PendingRequestView,
        meta: { requiresAuth: true }
    },
    {
        path: '/processingrequest',
        name: 'ProcessingRequest',
        component: ProcessingRequestView,
        meta: { requiresAuth: true }
    },
    {
        path: '/processedrequest',
        name: 'ProcessedRequest',
        component: ProcessedRequestView,
        meta: { requiresAuth: true }
    },
    {
        path: '/admindashboard',
        name: 'AdminDashboard',
        component: AdminDashboardView,
        meta: { requiresAuth: true }
    },
    {
        path: '/leaderdashboard',
        name: 'LeaderDashboard',
        component: LeaderDashboardView,
        meta: { requiresAuth: true }
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    linkActiveClass: 'active'
});

router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('user-token');

    if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;