import Vue from 'vue'
import VueRouter from 'vue-router'
import multiguard from 'vue-router-multiguard'
import store from '../store'

Vue.use(VueRouter)

const isNotLogged = (to, from, next) => {
  if (!store.getters.tokenAuth) {
    next()
  } else {
    next('/users')
  }
}

const isLoggedIn = (to, from, next) => {
  if (store.getters.tokenAuth) {
    next()
  } else {
    next('/login')
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    beforeEnter: multiguard([isNotLogged]),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    beforeEnter: multiguard([isNotLogged]),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    beforeEnter: multiguard([isNotLogged]),
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/Users.vue'),
    beforeEnter: multiguard([isLoggedIn]),
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: () => import('../views/Inventory.vue'),
    beforeEnter: multiguard([isLoggedIn]),
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('../views/Logout.vue'),
    beforeEnter: multiguard([isLoggedIn]),
  },
]

const router = new VueRouter({
  routes,
})

export default router
