import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/packtool',
    name: 'packtool',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Packtool.vue')
  },
  {
    path: '/scaffolding',
    name: 'scaffolding',
    component: () => import(/* webpackChunkName: "about" */ '../views/Scaffolding.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
