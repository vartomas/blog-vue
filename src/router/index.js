import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/createpost',
    name: 'Create',
    component: () => import('../views/CreatePost.vue'),
  },
  {
    path: '/particularposts/:search',
    name: 'ParticularPosts',
    component: () => import('../views/ParticularPosts.vue'),
  },
  {
    path: '/post/:author/:id',
    name: 'Post',
    component: () => import('../views/Post.vue'),
  },
  {
    path: '/editpost/:author/:id',
    name: 'EditPost',
    component: () => import('../views/EditPost.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
