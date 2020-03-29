//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  gotoImage: function() {
    wx.navigateTo({
      url: '../marriage/marriage'
    })
  },
  gotoMap: function () {
    wx.navigateTo({
      url: '../map/map'
    })
  },
  gotoVideo: function () {
    wx.navigateTo({
      url: '../video/video'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      console.log(app.globalData.userInfo)
      this.setData({
        userInfo: {},
        hasUserInfo: false
      })
    }
  },
  gotoLogin: function(e) {
    wx.navigateTo({
      url: '../login/login'
    })
  }
})
