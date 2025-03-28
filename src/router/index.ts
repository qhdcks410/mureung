/* eslint-disable @typescript-eslint/no-unused-vars */
import { createRouter, createWebHistory, useRoute, useRouter } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '@/components/common/NotFoundView.vue'
import login from  '../login/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: "/404",
      name: "notFoundView",
      component: NotFoundView,
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/404",
    },
  ],
})

// router
router.beforeEach((to, from, next) => {
  if(to.name === 'home'){
    return next({path: '/login'});
  }
	//const authStore = useAuthStore();
  //if (to.meta.requiresAuth && !authStore.isLogin) {
		//
	//}
	next();
});

export default router
