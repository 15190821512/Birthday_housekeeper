//logs.js
var util = require('../../utils/util.js')
var app = getApp();
var user = '';
var birth = '';
var tele = '';
var sex = '';
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    userName: '',
    birth: ''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: ''
    })
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    });
    user= wx.getStorageSync("userName");
    birth=wx.getStorageSync("birth");

    this.setData({
      userName: user,
      birth:birth
    })

  },


mprofile:function(){
  wx.navigateTo({
      url: '../mprofile/mprofile'
    })
}

})
