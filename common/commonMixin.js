import { mapState, mapMutations } from 'vuex'

export default {
  install (Vue) {
    Vue.mixin({
      methods: {
        checkedIsLogin () {
          return new Promise(resolve => {
            if (this.userInfo) {
              resolve()
            } else {
              uni.navigateTo({
                url: '/pages/userInfo/login/login'
              })
            }
          })
        },
        ...mapMutations(['updateUserInfo'])
      },
      computed: {
        ...mapState(['userInfo'])
      }
    })
  }
}