import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore, useAlertStore } from '@/stores';
import { Home } from '@/views';
import accountRoutes from './account.routes';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    { path: '/', component: Home },
    { ...accountRoutes },
    // catch all redirect to home page
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
});

router.beforeEach(async (to) => {
  // clear alert on route change
  const alertStore = useAlertStore();
  alertStore.clear();

  // redirect to login page if not logged in and trying to access a restricted page 
  const publicPages = ['/account/login', ];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  console.log('to.path ' + to.path)
  console.log('authRequired ' + authRequired)
  console.log('!authStore.user ' + !authStore.user)
  console.log(authRequired && !authStore.user)

  if (authRequired && !authStore.user) {
      authStore.returnUrl = to.fullPath;
      return '/account/login';
  }
});


