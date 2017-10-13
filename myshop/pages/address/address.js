// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myAddress: '',
    tips: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var username = wx.getStorageSync('username');
    wx.request({
      url: 'http://www.cgbmi.com/WebService_WX.asmx/GetAddress',
      data: {
        UserName: username
      },
      method: 'POST',
      dataType: JSON,
      success: function (res) {
        var data = JSON.parse(res.data);
        if (data.d == '无法连接用户数据库') {
          wx.showModal({
            title: '查看地址',
            content: '无法连接用户数据库',
            showCancel: false
          });
        }
        else {
          that.setData({
            myAddress: data.d
          })
        }
      },
      fail: function (err) {
        console.log(err);
        wx.showModal({
          title: '查看地址',
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
                    myAddress: res.address
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
                        myAddress: res.address
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
                myAddress: res.address
              })
            },
          })
        }
      }
    })
  },

  setAddress: function (e) {
    this.setData({
      myAddress: e.detail.value
    });
    if (this.data.myAddress == '') {
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

  saveAddress: function () {
    if (this.data.myAddress == '') {
      this.setData({
        tips: '地址不能为空'
      });
      return;
    }
    var that = this;
    var username = wx.getStorageSync('username');
    wx.showLoading({
      title: '正在保存',
    })
    wx.request({
      url: 'http://www.cgbmi.com/WebService_WX.asmx/ChangeAddress',
      data: {
        Address: that.data.myAddress,
        Name: username
      },
      method: 'POST',
      dataType: JSON,
      success: function (res) {
        wx.hideLoading();
        var data = JSON.parse(res.data);
        if (data.d == '无法连接用户数据库') {
          wx.showModal({
            title: '查看地址',
            content: '无法连接用户数据库',
            showCancel: false
          });
        }
        else if (data.d == '修改失败') {
          wx.showModal({
            title: '修改地址',
            content: '修改失败，请再次尝试',
            showCancel: false
          });
        }
        else {
          wx.showModal({
            title: '修改地址',
            content: '修改成功',
            showCancel: false
          });
        }
      },
      fail: function (err) {
        wx.hideLoading();
        console.log(err);
        wx.showModal({
          title: '修改地址',
          content: '无法连接网络服务器',
          showCancel: false
        });
      }
    })
  }
})