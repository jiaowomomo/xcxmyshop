// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: '',
    address: '',
    order: [],
    tips: '',
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var name = wx.getStorageSync('username');
    var that = this;
    that.setData({
      user: name
    });
    wx.request({
      url: 'http://www.cgbmi.com/WebService_WX.asmx/GetAddress',
      data: {
        UserName: name
      },
      method: 'POST',
      dataType: JSON,
      success: function (res) {
        var data = JSON.parse(res.data);
        if (data.d == '无法连接用户数据库') {
        }
        else {
          that.setData({
            address: data.d
          })
        }
      }
    });
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
    that.setData({
      order: myApp.globalData.order,
      total: myApp.globalData.total
    });
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

  selectAddress: function () {
    var that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              wx.chooseLocation({
                success: function (res) {
                  that.setData({
                    address: res.address
                  })
                },
              })
            },
            fail() {
              wx.openSetting({
                success: function () {
                  wx.chooseLocation({
                    success: function (res) {
                      that.setData({
                        address: res.address
                      })
                    },
                  })
                }
              })
            }
          })
        }
        else {
          wx.chooseLocation({
            success: function (res) {
              that.setData({
                address: res.address
              })
            },
          })
        }
      }
    })
  },

  setAddress: function (e) {
    this.setData({
      address: e.detail.value
    });
    if (this.data.address == '') {
      this.setData({
        tips: '地址不能为空'
      })
    }
    else {
      this.setData({
        tips: ''
      })
    }
  },

  submitChart: function () {
    var that = this;
    if (that.data.address == '') {
      that.setData({
        tips: '地址不能为空'
      });
      return;
    }
    var date = that.setTime();
    wx.showLoading({
      title: '正在下单',
      mask: true
    });
    wx.request({
      url: 'http://www.cgbmi.com/WebService_WX.asmx/SendOrder',
      data: {
        UserName: that.data.user,
        UserAddress: that.data.address,
        ArriveTime: date.toString(),
        UserOrder: JSON.stringify(that.data.order),
        SumMoney: that.data.total.toString()
      },
      method: 'POST',
      dataType: JSON,
      success: function (res) {
        var data = JSON.parse(res.data);
        console.log(data.d);
        wx.hideLoading();
        if (data.d == '下单失败') {
          wx.showModal({
            title: '下单',
            content: '下单失败，请再尝试',
            showCancel: false
          });
        }
        else if (data.d == '下单成功') {
          wx.showModal({
            title: '下单',
            content: '下单成功，请等候',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                var myApp = getApp();
                myApp.globalData.shopChart = [];
                myApp.globalData.order = [];
                myApp.globalData.total = 0;
                wx.switchTab({
                  url: '../index/index',
                });
              }
            }
          });
        }
      },
      fail: function (res) {
        console.log(res);
        wx.hideLoading();
        wx.showModal({
          title: '下单',
          content: '无法连接网络服务器',
          showCancel: false
        });
      }
    })
  },

  setTime: function () {
    var arriveTime;
    var date = new Date();
    date.setMinutes(date.getMinutes() + 30);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    arriveTime = year + "-";
    if (month < 10) {
      arriveTime += "0";
    }
    arriveTime += month + "-";
    if (day < 10) {
      arriveTime += "0";
    }
    arriveTime += day + "T";
    if (hour < 10) {
      arriveTime += "0";
    }
    arriveTime += hour + ":";
    if (minute < 10) {
      arriveTime += '0';
    }
    arriveTime += minute;
    return arriveTime;
  }
})