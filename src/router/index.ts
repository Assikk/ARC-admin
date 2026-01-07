import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import EmptyLayout from '@/layouts/EmptyLayout.vue'


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { 
        path: '',
        name: 'home',
        component: () => import('@/pages/home.vue'),
        meta: { title: 'Главная' }
      }
    ]
  },
  {
    path: '/auth/',
    component: EmptyLayout,
    children: [
      { 
        path: 'login',
        name: 'login',
        component: () => import('@/pages/auth/login.vue'),
        meta: { title: 'Авторизация' }
      },
      { 
        path: 'register',
        name: 'register',
        component: () => import('@/pages/auth/register.vue'),
        meta: { title: 'Регистрация' }
      },
      { 
        path: 'verify',
        name: 'Verify',
        component: () => import('@/pages/auth/verify.vue'),
        meta: { title: 'Верификация' }
      }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string || 'Arc admin'
  next()
})


export default router
