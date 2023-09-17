<template>
  <view class="save-incons" @click.stop="_changeSaveStatus">
    <uni-icons color="#ff6600" :type="isLike ? 'heart-filled':'heart'" :size="size"></uni-icons>
  </view>
</template>

<script>
export default {
  name: "SaveLikes",
  props: {
    item: Object,
    size: {
      type: String,
      default: '20'
    }
  },
  data () {
    return {

    };
  },
  methods: {
    async _changeSaveStatus () {
      await this.checkedIsLogin();
      const { msg, newUserInfo } = await this.$http.update_save_like({
        articleId: this.item._id,
        userId: this.userInfo._id
      })
      uni.showToast({
        title: msg,
        icon: 'none'
      })
      this.updateUserInfo({ ...this.userInfo, ...newUserInfo })
      // 触发followarticle界面从新进行列表数据获取
      uni.$emit('updateArticle')
    },
  },
  computed: {
    isLike () {
      try {
        return this.userInfo && this.userInfo.article_likes_ids.includes(this.item._id)
      } catch (e) {
        return false
      }
    }
  }
}
</script>

<style>
</style>
