Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopChart: [],
    total: 0
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
    var myApp = getApp();
    var that = this;
    this.setData({
      shopChart: myApp.globalData.shopChart
    });
    that.totalSum();
    console.log(this.data.shopChart);
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

  reduceCount: function (e) {
    var chartId = e.target.id.replace('reduce', '');
    var that = this;
    if (this.data.shopChart[chartId].Number == 1) {
      that.totalSum();
      return;
    }
    this.data.shopChart[chartId].Number--;
    this.setData({
      shopChart: this.data.shopChart
    });
    that.totalSum();
    console.log(this.data.shopChart);
  },

  addCount: function (e) {
    var chartId = e.target.id.replace('add', '');
    var that = this;
    this.data.shopChart[chartId].Number++;
    this.setData({
      shopChart: this.data.shopChart
    });
    that.totalSum();
    console.log(this.data.shopChart);
  },

  totalSum: function () {
    var sum = 0;
    var that = this;
    for (var i = 0; i < that.data.shopChart.length; i++) {
      sum += parseFloat(that.data.shopChart[i].Price) * parseInt(that.data.shopChart[i].Number);
    }
    that.setData({
      total: sum
    })
  },

  submitChart: function () {
    var name = wx.getStorageSync('username');
    if (name == '' || name == undefined) {
      wx.showModal({
        title: '结算',
        content: '请先登录',
        showCancel: false,
        success: function () {
          wx.navigateTo({
            url: '../userLogin/userLogin',
          })
        }
      });
      return;
    }
    var myApp = getApp();
    myApp.globalData.order = this.data.shopChart;
    if (myApp.globalData.order.length == 0) {
      wx.showModal({
        title: '结算',
        content: '请先选购商品',
        showCancel: false,
        success: function () {
          wx.switchTab({
            url: '../index/index',
          });
        }
      });
      return;
    }
    myApp.globalData.total = this.data.total;
    wx.navigateTo({
      url: '../order/order'
    })
  },

  delChart: function (e) {
    var chartId = e.target.id.replace('del', '');
    var that = this;
    var chart = that.data.shopChart[chartId];
    var index = that.data.shopChart.indexOf(chart);
    that.data.shopChart.splice(index, 1);
    that.setData({
      shopChart: that.data.shopChart
    });
    that.totalSum();
    console.log(that.data.shopChart);
  }
})