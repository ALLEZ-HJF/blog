import { login, register, getUserInfo } from '@/api/user'
const getDefaultState = () => {
  return {
    userInfo: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      login(user).then(response => {
        if (response.code === 200) {
          commit('SET_USER_INFO', response.data.data)
          resolve(response)
        } else {
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  register({ commit }, user) {
    return new Promise((resolve, reject) => {
      register(user).then(response => {
        if (response.code === 200) {
          commit('SET_USER_INFO', response.data.data)
          resolve(response)
        } else {
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  getUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(response => {
        if (response.code === 200) {
          commit('SET_USER_INFO', response.data)
          resolve(response)
        } else {
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  getRouter({ commit }) {

  },
  reset({ commit }) {
    commit('RESET_STATE')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
