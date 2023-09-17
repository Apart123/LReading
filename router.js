import { RouterMount, createRouter } from 'uni-simple-router';

import store from './store'

const router = createRouter({
  platform: process.env.VUE_APP_PLATFORM,
  routes: [...ROUTES]
});


//全局路由前置守卫
router.beforeEach((to, from, next) => {
  // 判断当前页面是否需要登录并且现在是没有登录的状态
  if (to.meta.needLogin && !store.state.userInfo) {
    next({
      name: "login",
      NAVTYPE: "push"  //跳转到普通页面，新开保留历史记录
    })
  } else {
    next();
  }
});


export {
  router,
  RouterMount
}