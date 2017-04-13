// pages/login/login.js
var ryzm = '';   //定义验证码
Page({
  data: {
    iconSize: [20, 30, 40, 50, 60, 70],
    iconColor: [
      'red'
    ],
    iconType: [
      'success', 'info', 'warn', 'waiting', 'safe_success', 'safe_warn',
      'success_circle', 'success_no_circle', 'waiting_circle', 'circle', 'download',
      'info_circle', 'cancel', 'search', 'clear'
    ],
    tele: '',
    yzm: ''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  //获取验证码
  yzm: function () {
    var tele = this.data.tele;
    if (tele.length < 1) {
      wx.showToast({
        title: '先输入手机号！',
        icon: 'success',
        duration: 1500
      })
      return false;
    };
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(tele)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'success',
        duration: 1500
      })
      return false;
    };
    var a = parseInt(Math.random() * 9);
    var b = parseInt(Math.random() * 9);
    var c = parseInt(Math.random() * 9);
    var d = parseInt(Math.random() * 9);
    var str = '' + a + b + c + d;

    wx.showModal({
      title: str,
      success: function (res) {
        if (res.confirm) {
          ryzm = str;     //获取验证码
        }
      }
    })
  },

  //验证下一步
  next: function () {
    var tele = this.data.tele;   //用户输入的手机号
    var uyzm = this.data.yzm;      //用户输入的验证码
    //验证手机号

    if (uyzm == null || uyzm.length == '' || uyzm != ryzm) {
      wx.showToast({
        title: '验证码有误！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }

    try {
      wx.setStorageSync('tele', tele);
    } catch (e) {
    }

    wx.navigateTo({
      url: 'login2'
    })
  },

  teleInput: function (e) {
    this.setData({
      tele: e.detail.value
    })
  },
  yzmInput: function (e) {
    this.setData({
      yzm: e.detail.value
    })
  },

}) 