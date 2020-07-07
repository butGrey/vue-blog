import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from '@/global/axios'
import moment from 'moment'
import '@/assets/iconfont/iconfont.js'
import '@/assets/iconfont/iconfont.css'
import MyPagination from "./common/pagination"
import MyComment from "./common/comment"

Vue.prototype.$axios = Axios
Vue.prototype.$moment = moment
Vue.config.productionTip = false
// Vue.prototype.baseURL = 'http://59.110.174.192:3000'
Vue.prototype.baseURL = 'http://localhost:3000'

Vue.component('my-pagination', MyPagination)
Vue.component('my-comment', MyComment)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
