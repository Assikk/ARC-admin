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
    path: '/login',
    component: EmptyLayout,
    children: [
      { 
        path: '',
        name: 'login',
        component: () => import('@/pages/login.vue'),
        meta: { title: 'Авторизация' }
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
