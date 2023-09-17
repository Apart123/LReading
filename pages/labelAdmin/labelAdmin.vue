<template>
  <view class="label-container">
    <view class="label-box">
      <view class="label-header">
        <view class="label-title">我的标签</view>
        <view class="label-edit" @click="startEdit">{{isEdit? '完成' :'编辑'}}</view>
      </view>
      <view class="label-content">
        <view class="label-content-item" v-for="(item,index) in selfLabelList" :key="index">
          {{item.name}}
          <uni-icons @click="deleteLabelItem(item)" v-if="isEdit" class="icon-close" type="clear" size="20" color="red"></uni-icons>
        </view>
        <view v-if="!selfLabelList.length" class="no-data">当前没有数据</view>
      </view>
    </view>
    <view class="label-box">
      <view class="label-header">
        <view class="label-title">标签推荐</view>
      </view>
      <view class="label-content">
        <view class="label-content-item" @click="changeSelfList(item)" v-for="(item,index) in recommentLabelList" :key="index">
          {{item.name}}
        </view>
        <view v-if="!recommentLabelList.length" class="no-data">当前没有数据</view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'
export default {
  watch: {
    userInfo: {
      immediate: true,
      handler (newVal, oldVal) {
        this.labelIds = [...(this.userInfo.label_ids)]
      }
    }
  },
  data () {
    return {
      isEdit: false,
      labelIds: []
    }
  },
  methods: {
    // 编辑按钮事件
    startEdit () {
      this.isEdit && this._updateLabel();
      this.isEdit = !this.isEdit;
    },
    // 修改标签发送数据到后端
    async _updateLabel () {
      const label_ids = this.selfLabelList.map(item => item._id)
      const res = await this.$http.update_label_ids({ userId: this.userInfo._id, label_ids });
      uni.showToast({
        title: res.msg
      })
      this.updateUserInfo({ ...this.userInfo, label_ids });
    },
    //修改当前用户的labelList 
    changeSelfList (item) {
      if (!this.isEdit) return
      this.labelIds.push(item._id)
    },
    // 删除用户选项内容
    deleteLabelItem (item) {
      this.labelIds = this.labelIds.filter(val => val !== item._id)
    }
  },
  computed: {
    ...mapState(['labelList']),
    selfLabelList () {
      return this.labelList.filter(item => this.labelIds.includes(item._id))
    },
    recommentLabelList () {
      return this.labelList.filter(item => !this.labelIds.includes(item._id) && item._id)
    },
  }
}
</script>

<style lang="scss">
@import "./css/labelAdmin.scss";
</style>
