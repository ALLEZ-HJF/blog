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
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/web',
    component: layoutWeb,
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/web/index/index'),
        meta: { title: '首页' }
      },
      {
        path: 'articleDetail/:aid',
        name: 'articleDetail',
        component: () => import('@/views/web/articleDetail/index'),
        meta: { title: '文章详情' }
      },
      {
        path: 'handleArticle',
        name: 'handleArticle',
        component: () => import('@/views/web/handleArticle/index'),
        meta: { title: '发布文章' }
      },
      {
        path: 'homePage/:uid',
        name: 'homePage',
        component: () => import('@/views/web/homePage/index'),
        meta: { title: '用户主页' }
      }
    ]
  },
  {
    path: '/admin',
    component: layoutAdmin,
    redirect: { name: 'dashboard', role: 'admin' },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/admin/dashboard/index'),
        meta: { title: '首页', role: 'admin' }
      }
    ]
  },
  {
    path: '/admin/users',
    component: layoutAdmin,
    meta: { title: '用户管理', icon: 'el-icon-s-custom', role: 'admin' },
    redirect: { name: 'userList' },
    children: [
      {
        path: 'userList',
        name: 'userList',
        component: () => import('@/views/admin/usersList/index'),
        meta: { title: '用户列表', role: 'admin' }
      },
      {
        path: 'userGroup',
        name: 'userGroup',
        component: () => import('@/views/admin/userGroup/index'),
        meta: { title: '用户组管理', role: 'admin' }
      }
    ]
  },
  {
    path: '/admin/articles',
    component: layoutAdmin,
    meta: { title: '文章管理', icon: 'el-icon-document', role: 'admin' },
    children: [
      {
        path: 'category',
        name: 'category',
        component: () => import('@/views/admin/articlesCategory/index'),
        meta: { title: '文章类型', role: 'admin' }
      },
      {
        path: 'articleList',
        name: 'articleList',
        component: () => import('@/views/admin/articlesList/index'),
        meta: { title: '文章列表', role: 'admin' }
      },
      {
        path: 'handleArticle',
        name: 'handleArticle',
        component: () => import('@/views/admin/handleArticle/index'),
        hidden: true,
        meta: { title: '处理文章', role: 'admin' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
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
