import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import EmptyLayout from '@/layouts/EmptyLayout.vue'
import Cookies from 'js-cookie'



const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { 
        path: '',
        name: 'home',
        component: () => import('@/pages/home/index.vue'),
        meta: { title: 'Главная', requiresAuth: true }
      },
      { 
        path: 'add',
        name: 'Add Property',
        component: () => import('@/pages/home/add.vue'),
        meta: { title: 'Добавление объявления', requiresAuth: true }
      },
      { 
        path: 'regions',
        name: 'Regions',
        component: () => import('@/pages/regions/index.vue'),
        meta: { title: 'Список регионов', requiresAuth: true }
      },
      { 
        path: 'regions/add',
        name: 'Add Region',
        component: () => import('@/pages/regions/add.vue'),
        meta: { title: 'Добавление региона', requiresAuth: true }
      },
      { 
        path: 'regions/edit/:id',
        name: 'Edit Region',
        component: () => import('@/pages/regions/edit.vue'),
        meta: { title: 'Изменение региона', requiresAuth: true }
      },
      { 
        path: 'regions/:id',
        name: 'Show Region',
        component: () => import('@/pages/regions/_id.vue'),
        meta: { title: 'Просмотр региона', requiresAuth: true }
      },
      { 
        path: 'cities',
        name: 'Cities',
        component: () => import('@/pages/cities/index.vue'),
        meta: { title: 'Список городов', requiresAuth: true }
      },
      { 
        path: 'cities/add',
        name: 'Add City',
        component: () => import('@/pages/cities/add.vue'),
        meta: { title: 'Добавление города', requiresAuth: true }
      },
      { 
        path: 'cities/edit/:id',
        name: 'Edit City',
        component: () => import('@/pages/cities/edit.vue'),
        meta: { title: 'Измнение города', requiresAuth: true }
      },
      { 
        path: 'cities/:id',
        name: 'Show City',
        component: () => import('@/pages/cities/_id.vue'),
        meta: { title: 'Просмотр города', requiresAuth: true }
      }
    ]
  },
  {
    path: '/auth',
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
        name: 'verify',
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
  const isAuth = Boolean(Cookies.get('token'))
  if(to.meta.requiresAuth && !isAuth) {
    next({name: 'login'})
    return
  }
  if(to.name === 'login' && isAuth) {
    next({name: 'home'})
    return
  }
  document.title = (to.meta.title as string) ?? 'Arc admin'
  next()
})


export default router
