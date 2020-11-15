import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../components/Home'
// import About from '../components/About'
// import User from '../components/User'

const Home = () => import('../components/Home')
const HomeNews = () => import('../components/HomeNews')
const HomeMessage = () => import('../components/HomeMessage')

const About = () => import('../components/About')
const User = () => import('../components/User')
const Profile = () => import('../components/Profile')


Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
    path: '/home',
    component: Home,
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '',
        redirect: 'news'
      },
      {
        path: 'news',
        component: HomeNews
      },
      {
        path: 'message',
        component: HomeMessage
      }
    ]

  },
  {
    path: '/about',
    component: About,
    meta: {
      title: '关于'
    },
    beforeEnter: (to,from,next) => {
      // console.log('这是关于页面的路由独享守卫');
      next();
    }
  },
  {
    path: '/user/:userId',
    component: User,
    meta: {
      title: '用户'
    }
  },  
  {
    path: '/profile',
    component: Profile,
    meta: {
      title: '档案'
    }
  }
],
  mode: 'history',
  linkActiveClass: 'active'
})

//前置守卫
router.beforeEach((to,from,next) => {
  document.title = to.matched[0].meta.title
  // console.log('+++++');
  next()
})

//后置钩子
// router.afterEach((to,from) => {
//   console.log(from)
//   console.log('-----');
// })

// 前置守卫和后置钩子都属于全局守卫
export default router