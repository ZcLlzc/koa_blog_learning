import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import { getUser } from '@/utils/auth'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes
})

// 路由拦截
router.beforeEach((to, from, next) => {
  NProgress.start()

  const token: string | null = getUser('token')
  if (token) {
    to.path === '/login' ? next('/') : next()
    return
  }
  if (to.meta.requireAuth) {
    next({
      path: '/login',
      replace: true
    })
    return
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
