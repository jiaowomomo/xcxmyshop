// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: '登录/注册'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    try {
      var name = wx.getStorageSync('username');
      if (name != '' && name != undefined) {
        this.setData({
          user: name
        })
      }
      else {
        this.setData({
          user: '登录/注册'
        })
      }
    }
    catch (e) {
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  redirectToUser: function () {
    if (this.data.user == '登录/注册') {
      wx.navigateTo({
        url: '../userLogin/userLogin',
      })
    }
  },

  redirectToAddress: function () {
    if (this.data.user != '登录/注册') {
      wx.navigateTo({
        url: '../address/address',
      })
    }
    else {
      wx.navigateTo({
        url: '../userLogin/userLogin',
      })
    }
  },
  
  redirectToMyOrder: function () {
    if (this.data.user != '登录/注册') {
      wx.navigateTo({
        url: '../myorder/myorder',
      })
    }
    else {
      wx.navigateTo({
        url: '../userLogin/userLogin',
      })
    }
  }
})