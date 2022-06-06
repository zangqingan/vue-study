import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component:() => import('@/views/Home')
  },
  {
    path: '/addSubject',
    component:() => import('@/views/addSubject')
  },
  {
    path: '/shopcar',
    component:() => import('@/views/shopcar')
  },
  {
    path: '/charts',
    component:() => import('@/views/charts')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
