<template>
  <view class="search-container">
    <!-- 搜索导航组件 -->
    <NavBar @sendSearchData="_sendSearchData" :isSearch="isSearch" :parentVal="parentVal" @updateVal="parentVal=$event"></NavBar>
    <!-- 搜索包裹 -->
    <view v-if="isShowHistory" class="search-wrapper">
      <!-- 没有进行搜索的操作 -->
      <view class="search-history-container">
        <!-- 头部 -->
        <view class="search-header">
          <text class="history-text">搜索历史</text>
          <text class="history-clean" @click="cleanHistory">清空</text>
        </view>
        <!-- 内容部分 -->
        <view v-if="historyList.length" class="search-history-content">
          <view @click="openHistory(item)" class="history-content-item" v-for="(item,index) in historyList" :key="index">{{item}}</view>
        </view>
        <view v-else class="no-data">当前没有搜索历史</view>
      </view>
    </view>
    <!-- 开始进行搜索的操作 -->
    <view v-else class="search-list-container">
      <ListItem  @saveHistory="saveHistory" :isShowLoading="isShowLoading" :articleList="searchList" v-if="searchList.length"></ListItem>
      <view v-else class="no-data">没有搜索到相关数据</view>
    </view>
  </view>
</template>

<script>
import { mapMutations,mapState } from 'vuex';
export default {
  data () {
    return {
      isSearch: true,
      searchList: [],
      parentVal: '',
      isShowLoading: false,
      isShowHistory: true,
    }
  },
  methods: {
    // 开始进行内容搜索
    async _sendSearchData () {
      this.isShowHistory = false
      if (!this.parentVal) {
        this.isShowHistory = true
        this.searchList = []
        return
      }
      const { articleList, total } = await this.$http.get_search_data({ searchVal: this.parentVal })
      this.searchList = articleList
    },
    // 弹出搜索内容
    openHistory(val) {
      this.parentVal = val
      this._sendSearchData()
    },  
    // 进行收藏历史记录操作
    saveHistory(val) {
      this.setHistory(this.parentVal)
    },
    ...mapMutations(['setHistory','cleanHistory'])
  },
  computed: {
    ...mapState(['historyList'])
  }
}
</script>

<style lang="scss">
@import "./css/search.scss";
</style>
