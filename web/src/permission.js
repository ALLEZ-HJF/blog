import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'
import { getUserInfo, getToken } from '@/utils/auth'

NProgress.configure({ showSpinner: false }) // NProgress Configuration
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)
  // 如果跳往后台管理则判断是否登陆以及登陆信息含有gid
  if (to.meta.role === 'admin') {
    if (getToken() !== '' && getUserInfo()) {
      // 拥有token正常跳转
      if (getUserInfo().gid) {
        next()
      } else {
        next({ path: '/' })
      }
    } else {
      next({ path: '/' })
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
