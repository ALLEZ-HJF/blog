import { constantRoutes } from '@/router'
import { getWebRouterList, getAdminRouterList } from '@/api/routers'
const state = {
  routes: [],
  adminRoutes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_ADMIN_ROUTES: (state, routes) => {
    state.adminRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

export function generaMenu(routes, myRouter) {
  routes.forEach(item => {
    const page = {
      path: item.path,
      component: (resolve) => require([`@/${item.component}`], resolve),
      name: item.name,
      meta: { icon: item.icon ||　'', role: item.role, title: item.title },
      hidden: item.hidden,
      children: [],
      title: item.title
    }
    if (item.redirect_name) {
      page.redirect = { name: item.redirect_name }
    }
    if (item.child.length > 0) {
      generaMenu(item.child, page.children)
    }
    myRouter.push(page)
  })
}

const actions = {
  // 路由从后台获取
  setRouter({ commit }) {
    return new Promise(resolve => {
      getWebRouterList().then(response => {
        const router = response.data
        const myRouter = []
        generaMenu(router, myRouter)
        commit('SET_ROUTES', myRouter)
        resolve(myRouter)
      })
    })
  },
  // 后台路由
  setAdminRouter({ commit }, data) {
    return new Promise((resolve, reject) => {
      getAdminRouterList(data).then(response => {
        const router = response.data
        const myRouter = []
        generaMenu(router, myRouter)
        commit('SET_ADMIN_ROUTES', myRouter)
        resolve(myRouter)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
