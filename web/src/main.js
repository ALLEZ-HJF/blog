import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/styles/reset.css' // A modern alternative to CSS resets
import '@/styles/index.scss' // global css
import store from './store'
import router from './router'
import '@/icons' // icon
import '@/permission'

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(ElementUI)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
