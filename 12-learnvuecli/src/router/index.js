import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import About from '../components/About'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
    path: '/home',
    component: Home

  },
  {
    path: '/about',
    component: About
  }],
  mode: 'history',
  linkActiveClass: 'active'
})

export default router