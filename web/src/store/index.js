import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import article from './modules/article'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    article
  },
  getters
})

export default store
