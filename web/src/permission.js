import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'
import { getToken } from '@/utils/auth'
NProgress.configure({ showSpinner: false }) // NProgress Configuration
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)
  if (store.state.permission.routes.length === 0) {
    let userInfo = ''
    if (getToken()) {
      // 有登录记录 获取userInfo
      store.dispatch('user/getUserInfo').then(res => {
        if (res.code === 200) {
          userInfo = res.data
        }
      })
    }
    // 请求获取动态路由
    const accessRoutes = await store.dispatch('permission/setRouter')
    if (userInfo.gid) {
      const adminRouter = await store.dispatch('permission/setAdminRouter', { gid: userInfo.gid })
      const routers = accessRoutes.concat(adminRouter)
      router.addRoutes(routers)
    } else {
      router.addRoutes(accessRoutes)
    }
    next({ ...to })
  } else {
    next()
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
