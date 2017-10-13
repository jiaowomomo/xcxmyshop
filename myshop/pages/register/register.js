// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    disabled: true,
    tips: '',
    passUser: false,
    address: ''
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

  checkUser: function (e) {
    this.setData({
      userName: e.detail.value
    });
    var name = e.detail.value;
    var that = this;
    if (name.length != 11) {
      this.setData({
        userName: '',
        disabled: true,
        tips: '请输入正确手机号码',
        passUser: false
      });
      return;
    }
    that.isRegister();
  },

  isRegister: function () {
    var that = this;
    wx.request({
      url: 'http://www.cgbmi.com/WebService_WX.asmx/IsExistUserName',
      data: {
        UserName: this.data.userName
      },
      method: 'POST',
      dataType: JSON,
      success: function (res) {
        var data = JSON.parse(res.data);
        console.log(data.d);
        if (data.d == 'true') {
          that.setData({
            userName: '',
            disabled: true,
            tips: '该号码已被注册',
            passUser: false
          });
        }
        else if (data.d == '无法连接用户数据库') {
          wx.showModal({
            title: '检查用户名',
            content: '无法连接用户数据库',
            showCancel: false
          });
          that.setData({
            userName: '',
            disabled: true,
            tips: '请重新输入号码',
            passUser: false
          });
        }
        else if (data.d == 'false') {
          that.setData({
            disabled: false,
            tips: '',
            passUser: true
          });
        }
      },
      fail: function (res) {
        console.log(res);
        wx.showModal({
          title: '检查用户名',
          content: '无法连接网络服务器',
          showCancel: false
        });
      }
    })
  },

  register: function () {
    if (this.data.passUser && (this.data.address != '')) {
      wx.showLoading({
        title: '正在注册',
        mask: true
      });
      wx.request({
        url: 'http://www.cgbmi.com/WebService_WX.asmx/RegisterWX',
        data: {
          name: this.data.userName,
          address: this.data.address
        },
        method: 'POST',
        dataType: JSON,
        success: function (res) {
          var data = JSON.parse(res.data);
          console.log(data.d);
          if (data.d == 'true') {
            wx.hideLoading();
            wx.showModal({
              title: '注册',
              content: '注册成功',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.switchTab({
                    url: '../index/index',
                  })
                }
              }
            })
          }
          else if (data.d == '无法连接用户数据库') {
            wx.hideLoading();
            wx.showModal({
              title: '注册',
              content: '无法连接用户数据库',
              showCancel: false
            });
          }
          else if (data.d == 'false') {
            wx.hideLoading();
            wx.showModal({
              title: '注册',
              content: '注册失败，请重新注册',
              showCancel: false
            });
          }
        },
        fail: function (res) {
          console.log(res);
          wx.hideLoading();
          wx.showModal({
            title: '注册',
            content: '无法连接网络服务器',
            showCancel: false
          });
        }
      })
    }
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
  }
})