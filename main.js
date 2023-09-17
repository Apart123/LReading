import Vue from 'vue'
import App from './App'
import module from './ajax/api/index.js'
import userMixin from './common/rulesMixin.js'
import store from './store'
import commonMixin from './common/commonMixin.js'
Vue.use(commonMixin)
Vue.use(userMixin)
Vue.config.productionTip = false

/* 路由组件扩展 */
import { router, RouterMount } from './router'
Vue.use(router)


App.mpType = 'app'
Vue.prototype.$http = module;

const app = new Vue({
  ...App,
  store
})

// #ifdef H5
RouterMount(app, router, '#app')
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
