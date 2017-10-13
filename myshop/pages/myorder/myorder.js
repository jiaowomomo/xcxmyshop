// pages/myorder/myorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var username = wx.getStorageSync('username');
    wx.showLoading({
      title: '正在加载订单',
      mask: true
    });
    wx.request({
      url: 'http://www.cgbmi.com/WebService_WX.asmx/FindUserOrder',
      data: {
        UserName: username
      },
      method: 'POST',
      dataType: JSON,
      success: function (res) {
        var data = JSON.parse(res.data);
        if (data.d == '无法连接用户数据库') {
          wx.hideLoading();
          wx.showModal({
            title: '订单',
            content: '无法连接用户数据库',
            showCancel: false
          })
        }
        else if (data.d == '') {
          wx.hideLoading();
        }
        else {
          wx.hideLoading();
          var arr = new Array();
          var newArr = new Array();
          arr = data.d.split('fenge');
          arr.pop();
          for (var i = 0; i < arr.length; i++) {
            newArr.push(JSON.parse(arr[i]));
          }
          that.setData({
            order: newArr
          });
        }
      },
      fail: function (res) {
        console.log(res);
        wx.hideLoading();
        wx.showModal({
          title: '订单',
          content: '无法连接网络服务器',
          showCancel: false
        });
      }
    })
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

  }
})