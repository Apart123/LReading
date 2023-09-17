<template>
  <view>
    <!-- 评论展示组件 -->
    <view class="comment-content-container" v-for="item in commentList" :key="item.comment_id">
      <CommentBox @commnetReply="commnetReply" :commentData="item"></CommentBox>
    </view>
    <uni-load-more v-if="commentList.length===0 || commentList.length > 5" :status="loading" :contentText="{	contentdown: '上拉显示更多',
						contentrefresh: '正在加载...',
						contentnomore: '没有更多评论了'}"></uni-load-more>

    <!-- 评论内容输入组件 -->
    <CommentMasker :showPopup="showPopup" @closePopupMasker="showPopup=$event" @sendCommentData="_sendCommentData">
    </CommentMasker>
  </view>
</template>

<script>
export default {
  onLoad (props) {
    this.articleId = props.articleId
    this._getCommentList()
  },
  // 界面滚动到底事件
  onReachBottom () {
    if (this.loading === 'noMore') return
    this.page++;
    this._getCommentList()
  },
  data () {
    return {
      articleId: '',
      page: 1,
      pageSize: 5,
      commentList: [],
      loading: 'loading',
      showPopup: false,
      replyData: {}
    }
  },
  methods: {
    async _getCommentList () {
      const list = await this.$http.get_comments({
        articleId: this.articleId,
        page: this.page,
        pageSize: this.pageSize,
      })
      if (list.length === 0) {
        this.loading = 'noMore'
        return
      }
      let oldList = JSON.parse(JSON.stringify(this.commentList))
      oldList.push(...list)
      this.commentList = oldList
    },
    async openMaskerComment () {
      await this.checkedIsLogin()
      this.showPopup = true
    },
    /* 处理回复事件函数 */
    commnetReply (data) {
      this.replyData = {
        "comment_id": data.comment.comment_id,
        is_reply: data.isReply
      }
      // 当前为回复内容的时候添加回复的ID
      data.comment.reply_id && (this.replyData.reply_id = data.comment.reply_id)
      this.openMaskerComment()
    },
    // 发送评论事件处理
    async _sendCommentData (content) {
      const {
        msg
      } = await this.$http.update_comment({
        userId: this.userInfo._id,
        articleId: this.articleId,
        content,
        ...this.replyData   // 扩展当前是否为回复指定评论内容
      })
      uni.showToast({
        title: msg
      })
      // 处理副作用事物
      this.showPopup = false;
      this.replyData = {};
      this.page = 1;
      this.commentList = [];
      this.loading = 'loading'
      this._getCommentList();
    }
  }
}
</script>

<style lang="scss">
.comment-content-container {
  padding: 0 15px;
  border-bottom: 1px solid #eee;
}
</style>
