// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    product: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '正在加载商品',
      mask: true
    });
    wx.request({
      url: 'http://www.cgbmi.com/WebService_WX.asmx/LoadProduct',
      data: {},
      method: 'POST',
      dataType: JSON,
      success: function (res) {
        var data = JSON.parse(res.data);
        if (data.d == '无法加载商品') {
          wx.hideLoading();
          wx.showModal({
            title: '商品',
            content: '无法加载商品',
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
            product: newArr
          });
        }
      },
      fail: function (res) {
        console.log(res);
        wx.hideLoading();
        wx.showModal({
          title: '商品',
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

  },

  addToChart: function (e) {
    console.log(e.target.id);
    var productId = e.target.id;
    var chart = getApp();
    var newChart = this.data.product[productId];
    newChart.Number=1;
    if (chart.globalData.shopChart.indexOf(newChart) == -1) {
      chart.globalData.shopChart.push(newChart);
      console.log(chart.globalData.shopChart);
    }
  }
})