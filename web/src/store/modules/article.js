import { getArticleList } from '@/api/article'

const getDefaultState = () => {
  return {
    articleList: [],
    articleTotal: 0,
    searchForm: {
      page_num: 1,
      page_size: 10,
      status: 1,
      title: '',
      cids: ''
    }
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_ARTICLE_LIST: (state, articleList) => {
    state.articleList = state.articleList.concat(articleList)
  },
  SET_ARTICLE_TOTAL: (state, total) => {
    state.articleTotal = total
  },
  RESET_ARTICLE_LIST: (state) => {
    state.articleList = []
  }
}

const actions = {
  getArticleList({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      getArticleList(state.searchForm).then(response => {
        const { data } = response
        commit('SET_ARTICLE_LIST', data.rows)
        commit('SET_ARTICLE_TOTAL', data.count)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  resetArticleList({ commit }) {
    return new Promise((resolve, reject) => {
      try {
        commit('RESET_ARTICLE_LIST')
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

