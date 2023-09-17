<template>
  <view class="code-container">
    <view class="vCode-btn" @click="getForm">
      {{runTime? `${time}秒后重新获取`:'获取验证码'}}
    </view>
  </view>
</template>

<script>
export default {
  name: "SendCode",
  // 小程序中无法进行内容获取
  props: {
    form: Object
  },
  data () {
    return {
      time: 60,
      runTime: false,
      timeId: null,
    };
  },
  methods: {
    getForm () {
      if (this.runTime) return
      // 判断手机号码是否输入正确
      this.$emit('getForm', this._sendCode)
    },
    async _sendCode (form) {
      const { phone } = await form.validateField(['phone'])
      // 开启定时器
      this.runTime = true
      this.timeRunning()
      // 发送数据请求到云函数
      const { msg, mobileCode } = await this.$http.get_code({ phone })
      uni.showToast({
        title: msg,
        icon: 'none'
      })
      console.log(mobileCode)
      this.$emit('setCurrentCode', mobileCode)
    },
    timeRunning () {
      this.timeId = setInterval(() => {
        if (this.time === 1) {
          clearInterval(timeId)
          this.runTime = false
          this.time = 60;
        }
        this.time--
      }, 1000)
    },
  },
  // 离开界面时进行定时器的清除操作
  beforeDestroy () {
    clearInterval(this.timeId)
    this.timeId = null
    this.runTime = false
    this.time = 60
  },
}
</script>

<style lang="scss">
.code-container {
  flex-shrink: 0;
  margin-right: 20rpx;
  .vCode-btn {
    background-color: $base-color;
    color: #ffffff;
    padding: 20rpx;
    border-radius: 10rpx;
    opacity: 0.8;
  }
}
</style>
