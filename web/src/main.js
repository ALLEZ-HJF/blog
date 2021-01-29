import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/styles/reset.css' // A modern alternative to CSS resets
import '@/styles/index.scss' // global css
import '@/icons' // icon
import '@/permission'
import store from './store'
import router from './router'

Vue.config.productionTip = false

Vue.prototype.toPage = function(name, query) {
  const { href } = this.$router.resolve({
    name: name,
    query: query
  })
  window.open(href, '_blank')
}
// 全局过滤表格多余字段
Vue.prototype.filterRow = (formData, row) => {
  const data = {}
  for (const key in formData) {
    for (const rowkey in row) {
      if (key === rowkey) {
        data[key] = row[rowkey]
        break
      }
    }
  }
  return data
}

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(mavonEditor)
Vue.use(ElementUI)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
