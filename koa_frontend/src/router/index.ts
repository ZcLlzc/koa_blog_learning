import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import { getUser } from '@/utils/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'layout',
    redirect: {
      path: '/home'
    },
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home.vue'),
        meta: {
          requireAuth: false
        }
      },
      {
        path: '/psychology',
        name: 'psychology',
        component: () => import('@/views/psychology.vue'),
        meta: {
          requireAuth: false
        }
      },
      {
        path: '/fiction',
        name: 'fiction',
        component: () => import('@/views/noval/fiction.vue'),
        meta: {
          requireAuth: false
        }
      },
      {
        path: '/fictionDetail',
        name: 'fictionDetail',
        component: () => import('@/views/noval/fictionDetail.vue'),
        meta: {
          requireAuth: false,
          parentMenu: 'fiction'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/:pathMatch(.*)',
    name: 'error',
    component: () => import('@/views/error.vue')
  }
]

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
