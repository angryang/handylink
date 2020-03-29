const url = "http://127.0.0.1:80";
const sessionId = getApp().globalData.sessionId
let header = {
  "Cookie": "JSESSIONID=" + sessionId
}
let api = {
  login: function (userinfo, successCallback, failCallback) {
    return wx.request({
      url: url + '/api/login', 
      method: "POST",
      data: userinfo,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: successCallback,
      fail: failCallback
    })
  },
  logout: function (successCallback, failCallback) {
    return instance({
      url: url + '/api/logout',
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: successCallback,
      fail: failCallback
    })
  },
}

module.exports = api
