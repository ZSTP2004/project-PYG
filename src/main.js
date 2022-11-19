import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

// 全局注册 三级联动组件
import TypeNav from '@/components/TypeNav'
import Pagination from '@/components/Pagination'
// 引用饿了么ui
import { MessageBox} from 'element-ui'

// 第一个参数 全局组件的名字  第二个参数 哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)
// 饿了么注册组件的时候，可以挂在原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

import router from '@/router'
import store from '@/store'
import 'swiper/css/swiper.css'

// 引入 mock 数据
import '@/mock/mockServe'
// 统一引入 API 的所有接口 
import * as API from '@/api' 
import VueLazyload from 'vue-lazyload'
import jd from '@/assets/jd.jpg'

Vue.use(VueLazyload,{
  error:jd
})
new Vue({
  render: h => h(App),
  // 注册路由
  router,
  store,
  // 注册全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API

  },
}).$mount('#app')
