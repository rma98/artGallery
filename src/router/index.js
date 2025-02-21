import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import Favoritos from '../views/Favoritos.vue';

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/favoritos', component: Favoritos },
    { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
