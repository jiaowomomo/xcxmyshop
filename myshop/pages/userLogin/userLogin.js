// pages/userLogin/userLogin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    tips: '',
    disabled: true
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

  checkLength: function (e) {
    var name = e.detail.value;
    if (name.length != 11) {
      this.setData({
        userName: '',
        disabled: true,
        tips: '请输入正确号码'
      });
    }
    else {
      this.setData({
        userName: name,
        disabled: false,
        tips: ''
      });
    }
  },

  userLogin: function () {
    var that = this;
    wx.showLoading({
      title: '正在登录',
      mask: true
    });
    wx.request({
      url: 'http://www.cgbmi.com/WebService_WX.asmx/UserLogin',
      data: {
        UserName: this.data.userName
      },
      method: 'POST',
      dataType: JSON,
      success: function (res) {
        var data = JSON.parse(res.data);
        console.log(data.d);
        if (data.d == 'true') {
          wx.hideLoading();
          try {
            wx.setStorageSync('username', that.data.userName)
          }
          catch (err) {
          }
          wx.switchTab({
            url: '../user/user',
          });
        }
        else if (data.d == 'false') {
          wx.hideLoading();
          that.setData({
            tips: '用户名不存在'
          })
        }
        else if (data.d == '无法连接用户数据库') {
          wx.hideLoading();
          wx.showModal({
            title: '登录',
            content: '无法连接用户数据库',
            showCancel: false
          });
        }
      },
      fail: function (res) {
        console.log(res);
        wx.hideLoading();
        wx.showModal({
          title: '登录',
          content: '无法连接网络服务器',
          showCancel: false
        });
      }
    })
  },

  register: function () {
    wx.navigateTo({
      url: '../register/register',
    })
  }
})