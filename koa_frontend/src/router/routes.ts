import { RouteRecordRaw } from 'vue-router'

// 定义路由规则
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
    path: '/sign',
    name: 'sign',
    component: () => import('@/views/sign.vue')
  },
  {
    path: '/:pathMatch(.*)',
    name: 'error',
    component: () => import('@/views/error.vue')
  }
]

export default routes
