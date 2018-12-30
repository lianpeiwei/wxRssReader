var t = getApp(), e = require("../common/config.js");

Page({
  data: {
    more: !0,
    chapter: [],
    chapter_display: [],
    filter_type: 1,
    filter_title: "显示所有文章列表",
    filter_hide: !0,
    filter_name: [{
      text: "显示所有文章列表",
      bindtap: "showAll"
    }, {
      text: "显示未读文章列表",
      bindtap: "showUnread"
    }, {
      text: "显示已读文单列表",
      bindtap: "showReaded"
    }]
  },
  FilterSheetTap: function () {
    wx.setStorageSync("filter_type", this.data.filter_type);
    this.setData({
      filter_hide: !this.data.filter_hide
    });
  },
  setFilterSilence: function (t) {
    this.setData({
      filter_type: t,
      filter_title: this.data.filter_name[t - 1].text
    }), this.refreshDisplay();
  },
  setFilter: function (t) {
    this.setData({
      filter_type: t,
      filter_title: this.data.filter_name[t - 1].text
    }), this.FilterSheetTap(), this.refreshDisplay();
  },
  showAll: function () {
    this.setFilter(1);
  },
  showUnread: function () {
    this.setFilter(2);
  },
  showReaded: function () {
    this.setFilter(3);
  },
  FilterSheetCancel: function () {
    this.FilterSheetTap();
  },
  onLoad: function () {
    var e = this;
    t.login(function () {
      var t = wx.getStorageSync("filter_type");
      void 0 != t && "" != t && e.setFilterSilence(t), e.refreshFrom(0, function () {
        e.refreshDisplay();
      });
    });
  },
  onShow: function () {
    this.refreshDisplay();
  },
  refreshDisplay: function () {
    var t = this.data.filter_type;
    if (console.log("t:" + t), 1 == t) this.setData({
      chapter_display: this.data.chapter
    }); else {
      for (var e = this.data.chapter, i = new Array(e.length), a = 0, s = 0; s < e.length; s++) {
        var r = e[s];
        r.read || 2 != t ? r.read && 3 == t && (i[a] = r, a++) : (i[a] = r, a++);
      }
      i = i.slice(0, a);
      console.log("push:" + a + ":" + e.length + ":" + i.length), this.setData({
        chapter_display: i
      });
    }
  },
  refreshIdx: 0,
  refreshFrom: function (i, a) {
    var s = e.requrl + "/page/get", r = t.getuid(), l = this;
    wx.request({
      url: s,
      method: "POST",
      data: {
        uid: r,
        index: i
      },
      dataType: "json",
      success: function (t) {
        var e = t.data;
        console.log(e);
        for (r = 0; r < e.length; r++) e[r].style = "chapter-item";
        for (var s, r = i; r < e.length + i; r++) e[r].index = r;
        s = 0 == i ? e : l.data.chapter.concat(e), l.setData({
          chapter: s
        }), l.refreshIdx = i + e.length, console.log("refresh:" + i + ":" + l.refreshIdx + ":" + l.data.chapter.length),
          wx.hideLoading(), void 0 != a && a();
      },
      fail: function (t) {
        console.log(t);
      }
    }), wx.showLoading({
      title: "数据加载中",
      mask: !0
    });
  },
  onPullDownRefresh: function () {
    this.refreshIdx = 0;
    var t = this;
    console.log("pullUpper"), this.refreshFrom(0, function () {
      t.refreshDisplay(), wx.stopPullDownRefresh();
    });
  },
  ctrl_jump: !1,
  onHide: function () {
    this.ctrl_jump = !1, console.log("onHide");
  },
  touched: null,
  setClass: function (t, e) {
    var i = {};
    i["chapter[" + t.toString() + "].style"] = e, this.setData(i);
  },
  touchS: function (t) {
    var e = t.target.dataset.index;
    void 0 != e && (this.setClass(e, "chapter-item-select"), this.touched = e, console.log("Start"));
  },
  touchM: function (t) {
    var e = this.touched;
    void 0 != e && null != e && (this.setClass(e, "chapter-item"), this.touched = null);
  },
  touchE: function (i) {
    var a = this.touched;
    if (null != a && (this.setClass(this.touched, "chapter-item"), this.touched = null,
      !this.ctrl_jump)) {
      this.ctrl_jump = !0;
      var s = this;
      t.savechapter(this.data.chapter);
      var r = this.data.chapter_display[a];
      console.log("readed:"), console.log(r);
      var l = "../single/single?id=" + r.index;
      if (console.log(r), 0 == r.read) {
        var h = e.requrl + "/page/read", o = t.getuid();
        wx.request({
          url: h,
          method: "POST",
          data: {
            uid: o,
            cid: r.cid
          }
        });
        var n = {};
        n["chapter[" + r.index + "].read"] = !0, s.setData(n);
      }
      wx.navigateTo({
        url: l
      });
    }
  },
  onShareAppMessage: function () { }
});