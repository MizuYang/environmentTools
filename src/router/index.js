import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/HomeView.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/page/WeatherView.vue')
      },
      {
        path: 'covid',
        component: () => import('@/views/page/CovidView.vue')
      },
      {
        path: 'rapidTest',
        component: () => import('@/views/page/RapidTest.vue')
      },
      {
        path: 'naturalDisaster',
        component: () => import('../views/page/NaturalDisaster.vue')
      },
      {
        path: 'aboutMe',
        component: () => import('../views/page/AboutMe.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.fullPath.match('/')) {
      return {
        top: 0 //* 切換頁面時會切換到最上面的位置
      }
    }
    return {}
  }
})

export default router
