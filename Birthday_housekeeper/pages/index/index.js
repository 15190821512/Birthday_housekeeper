//index.js

var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    feed: [],
    feed_length: 0,
     // hasEmptyGrid 变量控制是否渲染空格子，若当月第一天是星期天，就不应该渲染空格子
    hasEmptyGrid: false
  },
  //事件处理函数
  bindItemTap: function() {
    wx.navigateTo({
      url: '../birthday/birthday'
    })
  },
  bindQueTap: function() {
    wx.navigateTo({
      url: '../myself/myself'
    })
  },
  // onLoad: function () {
  //   console.log('onLoad')
  //   var that = this
  //   //调用应用实例的方法获取全局数据
  //   this.refresh();
  // },
   // 初始化数据
  onLoad(options) {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    // this.refresh();
    // 日期控件
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);
    this.setData({
      cur_year,
      cur_month,
      weeks_ch
    })
  },

  upper: function () {
    wx.showNavigationBarLoading()
    this.refresh();
    console.log("upper");
    setTimeout(function(){wx.hideNavigationBarLoading();wx.stopPullDownRefresh();}, 2000);
  },
  lower: function (e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function(){wx.hideNavigationBarLoading();that.nextLoad();}, 1000);
    console.log("lower")
  },
  //scroll: function (e) {
  //  console.log("scroll")
  //},

  //网络请求数据, 实现首页刷新
  refresh0: function(){
    var index_api = '';
    util.getData(index_api)
        .then(function(data){
          //this.setData({
          //
          //});
          console.log(data);
        });
  },

  //使用本地 fake 数据实现刷新效果
  refresh: function(){
    var feed = util.getData2();
    console.log("loaddata");
    var feed_data = feed.data;
    this.setData({
      feed:feed_data,
      feed_length: feed_data.length
    });
  },

  //使用本地 fake 数据实现继续加载效果
  nextLoad: function(){
    var next = util.getNext();
    console.log("continueload");
    var next_data = next.data;
    this.setData({
      feed: this.data.feed.concat(next_data),
      feed_length: this.data.feed_length + next_data.length
    });
  },


  // 日期列表

  // 获取当月共多少天
  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  // 获取当月第一天星期几
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  // 计算当月1号前空了几个格子
  calculateEmptyGrids(year, month) {
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
      this.setData({
        hasEmptyGrid: true,
        empytGrids
      });
    } else {
      this.setData({
        hasEmptyGrid: false,
        empytGrids: []
      });
    }
  },
  // 绘制当月天数占的格子
  calculateDays(year, month) {
    let days = [];
    const thisMonthDays = this.getThisMonthDays(year, month);
    for (let i = 1; i <= thisMonthDays; i++) {
      days.push(i);
    }
    this.setData({
      days
    });
  },
  // 切换控制年月
  handleCalendar(e) {
    const handle = e.currentTarget.dataset.handle;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    if (handle === 'prev') {
      let newMonth = cur_month - 1;
      let newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }
 
      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);
 
      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })
 
    } else {
      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }
 
      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);
 
      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })
    }
  },
  onShareAppMessage() {
    return {
      title: '小程序日历',
      desc: '还是新鲜的日历哟',
      path: 'pages/calendar/calendar'
    }
  }


})

