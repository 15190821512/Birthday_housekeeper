// pages/mprofile/mprofile.js
var tele='';
var user='';
var birth='';
var riqi='';
var sex='';
var xinzuo='';
Page({
  data: {
    tele:'',
    user:'',
    sex:'',
    birth:'',
    xinzuo:'',
    riqi:''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

//电话号码
    tele = wx.getStorageSync("tele");
    user= wx.getStorageSync("userName");
    birth=wx.getStorageSync("birth");
    sex=wx.getStorageSync("sex");
    console.log(birth)
    var birth1=birth.substr(5,2);
    var birth2=birth.substr(8,2);
    birth=birth1+"月"+birth2+"日";
    riqi=birth1+"."+birth2
    var birth0=birth1+birth2;
    if(birth0>'0321'&&birth0<'0419'){
      xinzuo='白羊座'
    }if(birth0>'0420'&&birth0<'0520'){
      xinzuo='金牛座'
    }if(birth0>'0521'&&birth0<'0621'){
      xinzuo='双子座'
    }if(birth0>'0622'&&birth0<'0722'){
      xinzuo='巨蟹座'
    }if(birth0>'0723'&&birth0<'0822'){
      xinzuo='狮子座'
    }if(birth0>'0823'&&birth0<'0922'){
      xinzuo='处女座'
    }if(birth0>'0923'&&birth0<'1023'){
      xinzuo='天秤座'
    }if(birth0>'1024'&&birth0<'1122'){
      xinzuo='天蝎座'
    }if(birth0>'1123'&&birth0<'1221'){
      xinzuo='射手座'
    }if(birth0>'1222'&&birth0<'1231'||birth0>'0101'&&birth0<'0119'){
      xinzuo='摩羯座'
    }if(birth0>'0120'&&birth0<'0218'){
      xinzuo='水瓶座'
    }if(birth0>'0219'&&birth0<'0320'){
      xinzuo='双鱼座'
    }

    this.setData({
      user:user,
      tele: tele,
      sex:sex,
      birth:birth,
      xinzuo:xinzuo,
      riqi:riqi,
    })




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







})