import { createRouter, createWebHistory } from "vue-router"
import { routerMaps } from './routerMap'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routerMaps,
});

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    next()
  }
});

export default router
