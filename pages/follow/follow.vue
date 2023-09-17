<template>
  <view class="follow-container">
    <view class="follow-tab">
      <view class="follow-tab-box">
        <view class="follow-tab-item" :class="{active:currentIndex===0}" @click="currentIndex =0">文章</view>
        <view class="follow-tab-item" :class="{active:currentIndex===1}" @click="currentIndex =1">作者</view>
      </view>
    </view>
    <!-- 内容切换区域 -->
    <view class="follow-list-container">
      <swiper class="follow-list-swiper" :current="currentIndex" @change="currentIndex =$event.detail.current">
        <swiper-item :class="{'no-data':articleDataNone}">
          {{articleDataNone && '暂无收藏的文章'}}
          <!-- <view v-show="articleDataNone"  class="no-data"> {{articleDataNone ? '暂无收藏的文章' : 123}}</view> -->
          <ListItem :isShowLoading="isShowLoading" :articleList="articleList" v-if="articleList.length"></ListItem>
        </swiper-item>
        <swiper-item>
          <AuthorList :authorList="authorList" v-if="authorList.length"></AuthorList>
          <view v-if="authorDataNone" class="no-data">暂无关注的作者</view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
export default {
  onLoad () {
    // #ifdef MP-WEIXIN
    if (!this.$store.state.userInfo) {
      uni.redirectTo({
        url: '/pages/userInfo/login/login'
      })
      return
    }
    // #endif
    // todo 没有这个历史记录栈的时候不会触发这个事件
    uni.$on('updateArticle', (e) => {
      this._getFollowArticle('noLoading');
    })
    // todo 修改关注的作者，进行从新请求函数 
    uni.$on('updateAuthor', (e) => {
      this._getAuthorList('noLoading');
    })

    this._getFollowArticle();
    this._getAuthorList();
  },
  data () {
    return {
      currentIndex: 0,
      articleList: [],
      isShowLoading: false,
      articleDataNone: '',
      authorDataNone: '',
      authorList: [],
    }
  },
  methods: {
    // 获取关注文章
    async _getFollowArticle (isLoading) {
      const list = await this.$http.get_follow_article({ userId: this.userInfo._id,isLoading })
      if (list.length) {
        this.articleDataNone = ''
      } else {
        this.articleDataNone = true
      }
      this.articleList = list
    },
    // 获取关注作者
    async _getAuthorList (isLoading) {
      const list = await this.$http.get_follow_author({ userId: this.userInfo._id,isLoading })
      this.authorList = list
       if (list.length) {
        this.authorDataNone = ''
      } else {
        this.authorDataNone = true
      }
    }
  }
}
</script>

<style lang="scss">
@import "./css/follow.scss";
</style>
