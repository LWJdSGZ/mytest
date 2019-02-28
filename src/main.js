import Vue from 'vue'
import App from './app'
import router from './router'
import iView from 'iview'
import echarts from 'echarts'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

Vue.use(iView)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: (h) => {
    return h(App)
  }
})
