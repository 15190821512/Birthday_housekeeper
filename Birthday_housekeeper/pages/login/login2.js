// pages/login/login2.js
var sex = '男';    //定义性别
Page({
  data: {
    items: [
      { name: 'm', value: '男', checked: 'true' },
      { name: 'w', value: '女' },
    ],
    userName: '',
    birth: '',
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


  save: function () {
    var userName = this.data.userName;
    var birth = this.data.birth;

    if (userName == null || userName == '') {
      wx.showToast({
        title: '姓名不能为空！',
        icon: 'success',
        duration: 1500
      })
      return false;
    };
console.log(userName.length)
    if (userName.length>6) {
      wx.showToast({
        title: '姓名不能超过6位！',
        icon: 'success',
        duration: 1500
      })
      return false;
    };

    var myreg = /^[\u4e00-\u9fa5]|[a-zA-Z]$/;  //中文，英文
    if (!myreg.test(userName)) {
      wx.showToast({
        title: '只能输入中英文！',
        icon: 'success',
        duration: 1500
      })
      return false;
    };

    if (birth.length < 1) {
      wx.showToast({
        title: '生日不能为空！',
        icon: 'success',
        duration: 1500
      })
      return false;
    };

    try {
      wx.setStorageSync('userName', userName);
      wx.setStorageSync('birth', birth);
      wx.setStorageSync('sex', sex);
    } catch (e) {
    }

    wx.switchTab({
      url: '../myself/myself'
    })

  },

  bindDateChange: function (e) {
    this.setData({
      birth: e.detail.value
    })
  },
  useNinput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  radioChange: function (e) {
    if (sex == '男') {
      sex = '女';
    } else {
      sex = '男';
    }
  }

})