import Vue from 'vue'
import Router from 'vue-router'
import layoutWeb from '@/layoutWeb'
import layoutAdmin from '@/layoutAdmin'
Vue.use(Router)

export const constantRoutes = [
  {
    path: '/web',
    component: layoutWeb,
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'web/index',
        component: () => import('@/views/web/index/index'),
        meta: { title: '首页' }
      }
    ]
  },
  {
    path: '/admin',
    component: layoutAdmin,
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/admin/login/index')
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}


export default router
