import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import checkUser from "@/core/checkUser";
import { authComp } from '@/composables/auth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const { refreshToken } = authComp()
  if (localStorage.getItem('refreshToken')) {
    await refreshToken(localStorage.getItem('refreshToken'))
  }

  const routeIsProtected = to.matched.some(item => item.meta.protectedRoute)
  if (routeIsProtected) {
    const access = await checkUser.checkUser()
    if (!access) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
