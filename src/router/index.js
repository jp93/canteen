import Vue from 'vue'
import Router from 'vue-router'
import bridge from '@/bridge/h5'
import Utils from '@/utils/index'
import { reject } from 'q'



const Home = resolve => {
  import('@/pages/home/home').then(module => {
    resolve(module)
  })
}





Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
      name: 'home',
      meta: { title: '首页' }
    },
    {
      path: '/home',
      component: Home,
      name: 'home',
      meta: { title: '首页' }
    }
  ]
})
router.beforeEach((to, from, next) => {
  // 动态修改title
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next()
})

export default router
