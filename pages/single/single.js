var t = getApp(), o = require("../common/config.js"), a = require("../../wxParse/wxParse.js");

Page({
  data: {},
  loadContent: function (e, n) {
    var c = o.requrl + "/page/detail", i = t.getuid(), s = e.cid, l = this;
    console.log("start"), wx.request({
      url: c,
      method: "POST",
      data: {
        uid: i,
        cid: s,
        content: n
      },
      dataType: "json",
      success: function (t) {
        console.log(t);
        var o = t.data;
        e.content = o.content, e.author = o.author, e.date = o.date, e.link = o.link, wx.hideLoading();
        try {
          a.wxParse("article", "html", o.content, l, 5);
        } catch (t) {
          return 1 == n && l.loadContent(e, !1), void wx.showModal({
            title: "提示",
            content: "html显示出错，可能由于此站点RSS并不是全文输出, 正在显示RSS描述内容",
            showCancel: !1
          });
        }
        l.setData({
          chapter: e
        });
      },
      fail: function (t) {
        console.log(t);
      }
    }), wx.showLoading({
      title: "数据加载中",
      mask: !0
    });
  },

  onLoad: function (o) {
    console.log(o);
    var e = t.globalData.chapter[o.id], n = e.content;
    console.log("onLoad" + e.content), console.log(e), void 0 != n ? (this.setData({
      chapter: e
    }), a.wxParse("article", "html", t.globalData.chapter[o.id].content, this, 5)) : this.loadContent(e, !0);
  },

  docopy: function () {
    var t = this.data.chapter;
    void 0 != t && void 0 != t.link && wx.setClipboardData({
      data: t.link,
      success: function (t) {
        wx.showToast({
          title: "已复制文章链接",
          icon: "success",
          duration: 1e3
        });
      }
    });
  },
  bindchange: function (t) {
    console.log("swipper-change"), console.log(t);
  }
})