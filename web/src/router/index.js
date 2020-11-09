import Vue from 'vue'
import Router from 'vue-router'
import layoutWeb from '@/layoutWeb'
import layoutAdmin from '@/layoutAdmin'
Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    component: layoutWeb,
    hidden: true,
    redirect: '/web/index'
  },
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
    redirect: {name: 'userList'}
  },
  {
    path: '/admin/users',
    component: layoutAdmin,
    meta: { title: '用户管理', icon: 'el-icon-s-custom' },
    redirect: { name: 'userList'},
    children: [
      {
        path: 'userList',
        name: 'userList',
        component: () => import('@/views/admin/usersList/index'),
        meta: { title: '用户列表' }
      },
      {
        path: 'userGroup',
        name: 'userGroup',
        component: () => import('@/views/admin/userGroup/index'),
        meta: { title: '用户组管理' }
      }
    ]
  },
  {
    path: '/admin/articles',
    component: layoutAdmin,
    meta: { title: '文章管理',icon: 'el-icon-document' },
    children: [
      {
        path: 'category',
        name: 'category',
        component: () => import('@/views/admin/articlesCategory/index'),
        meta: { title: '文章类型'}
      },
      {
        path: 'articleList',
        name: 'articleList',
        component: () => import('@/views/admin/articlesList/index'),
        meta: { title: '文章列表'}
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
