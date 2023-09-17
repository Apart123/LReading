export default {
  updateUserInfo (state, userInfo) {
    uni.setStorageSync('userInfo', userInfo);
    state.userInfo = userInfo;
  },
  // 设置历史收藏信息
  setHistory (state, val) {
    let list = state.historyList;
    // 判断是否包含当前搜索的内容，包含直接不执行任何操作
    if (list.length > 0 && list.findIndex(item => item === val) > -1) return
    list.unshift(val);
    uni.setStorageSync('historyList', list)
    state.historyList = list;
  },
  // 清空搜索历史信息
  cleanHistory (state) {
    uni.removeStorageSync('historyList')
    state.historyList = []
    uni.showToast({
      title: "清空完成",
      icon: "success"
    })
  },
  // 设置导航栏选项卡
  setLabelList (state, labelList) {
    uni.setStorageSync('labelList',labelList)
    state.labelList = labelList
  }
}