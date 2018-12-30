var t = require("../common/config.js"), s = getApp();

Page({
    data: {
        rss: [],
        rss_subscribe_url1: ""
    },
    refreshList: function() {
        var e = s.getuid();
        if (null != e) {
            var o = this, i = t.requrl + "/rsslist/get";
            wx.request({
                url: i,
                data: {
                    uid: e
                },
                method: "POST",
                dataType: "json",
                success: function(t) {
                    var s = t.data;
                    console.log(s), o.setData({
                        rss: s
                    }), wx.hideLoading();
                },
                fail: function(t) {
                    console.log(t);
                }
            }), wx.showLoading({
                title: "加载中",
                mask: !0
            });
        }
    },
 
    formSubmit: function(s) {
        var e = t.requrl + "/notice/subscribe";
        wx.request({
            url: e,
            data: {
                uid: 0,
                formid: s.detail.formId
            },
            method: "POST"
        });
    },

    onShow: function() {
        var t = this;
        s.login(function() {
            t.refreshList();
        });
    },

    onPullDownRefresh: function() {
        this.refreshList();
    },

    onShareAppMessage: function() {},
    rss_subscribe_url: "",
    rss_subscribe_url1: "",
    rss_subscribe_url2: "",
    rss_subscribe_url3: "",
    rss_subscribe_url4: "",
    rss_subscribe_url5: "",
    onRssInput: function(t) {
        this.rss_subscribe_url = t.detail.value;
    },

    switch1Change: function() {
      var rss_subscribe_url1 = 'https://www.reddit.com/r/Telegraph1.rss';
      this.rss_subscribe_url = rss_subscribe_url1;
      var o = this;
      this.resetItem(-1);
      var i = this.rss_subscribe_url;
      if ("http://" != i.substr(0, 7).toLowerCase() && "https://" != i.substr(0, 8).toLowerCase() && (i = "http://" + i),
        console.log("onSave:" + i), "" != i) {
        var n = s.getuid();
        if (null != n) {
          console.log("save:" + n);
          var a = t.requrl + "/rsslist/add";
          wx.login({
            success: function (t) {
              console.log("code:" + t.code), wx.request({
                url: a,
                method: "POST",
                data: {
                  rss: i,
                  uid: n
                },
                header: {
                  "content-type": "application/json"
                },
                dataType: "json",
                success: function (t) {
                  if (console.log(t), 200 == t.statusCode) {
                    var s = {};
                    s["rss[" + o.data.rss.length + "]"] = t.data, console.log(t), o.setData(s);
                  } else wx.showModal({
                    title: "提示",
                    content: t.data.errmsg,
                    showCancel: !1
                  });
                  wx.hideLoading();
                },
                fail: function (t) {
                  console.log(t);
                }
              });
            }
          }), wx.showLoading({
            title: "保存中",
            mask: !0
          });
        }
      } else wx.showModal({
        title: "提示",
        content: "请输入要订阅的RSS地址",
        showCancel: !1
      });
    },
    
    onRemove: function(e) {
        var o = this, i = s.getuid(), n = e.target.dataset.index;
        this.resetItem(-1);
        var a = this.data.rss, h = a[n], u = t.requrl + "/rsslist/del";
        console.log("rssid", h.rssid), wx.request({
            url: u,
            method: "POST",
            data: {
                rssid: h.rssid,
                uid: i
            },
            header: {
                "content-type": "application/json"
            },
            dataType: "json",
            success: function(t) {
                200 != t.statusCode ? wx.showModal({
                    title: "提示",
                    content: t.data.errmsg,
                    showCancel: !1
                }) : (a.splice(n, 1), o.setData({
                    rss: a
                })), wx.hideLoading();
            },
            fail: function(t) {
                console.log(e);
            }
        }), console.log("onRemove", n);
    },

  switch2Change: function () {
    var rss_subscribe_url2 = 'https://www.reddit.com/r/Telegraph2.rss';
    this.rss_subscribe_url = rss_subscribe_url2;
    var o = this;
    this.resetItem(-1);
    var i = this.rss_subscribe_url;
    if ("http://" != i.substr(0, 7).toLowerCase() && "https://" != i.substr(0, 8).toLowerCase() && (i = "http://" + i),
      console.log("onSave:" + i), "" != i) {
      var n = s.getuid();
      if (null != n) {
        console.log("save:" + n);
        var a = t.requrl + "/rsslist/add";
        wx.login({
          success: function (t) {
            console.log("code:" + t.code), wx.request({
              url: a,
              method: "POST",
              data: {
                rss: i,
                uid: n
              },
              header: {
                "content-type": "application/json"
              },
              dataType: "json",
              success: function (t) {
                if (console.log(t), 200 == t.statusCode) {
                  var s = {};
                  s["rss[" + o.data.rss.length + "]"] = t.data, console.log(t), o.setData(s);
                } else wx.showModal({
                  title: "提示",
                  content: t.data.errmsg,
                  showCancel: !1
                });
                wx.hideLoading();
              },
              fail: function (t) {
                console.log(t);
              }
            });
          }
        }), wx.showLoading({
          title: "保存中",
          mask: !0
        });
      }
    } else wx.showModal({
      title: "提示",
      content: "请输入要订阅的RSS地址",
      showCancel: !1
    });
  },

  switch3Change: function () {
    var rss_subscribe_url3 = 'https://www.reddit.com/r/Telegraph3.rss';
    this.rss_subscribe_url = rss_subscribe_url3;
    var o = this;
    this.resetItem(-1);
    var i = this.rss_subscribe_url;
    if ("http://" != i.substr(0, 7).toLowerCase() && "https://" != i.substr(0, 8).toLowerCase() && (i = "http://" + i),
      console.log("onSave:" + i), "" != i) {
      var n = s.getuid();
      if (null != n) {
        console.log("save:" + n);
        var a = t.requrl + "/rsslist/add";
        wx.login({
          success: function (t) {
            console.log("code:" + t.code), wx.request({
              url: a,
              method: "POST",
              data: {
                rss: i,
                uid: n
              },
              header: {
                "content-type": "application/json"
              },
              dataType: "json",
              success: function (t) {
                if (console.log(t), 200 == t.statusCode) {
                  var s = {};
                  s["rss[" + o.data.rss.length + "]"] = t.data, console.log(t), o.setData(s);
                } else wx.showModal({
                  title: "提示",
                  content: t.data.errmsg,
                  showCancel: !1
                });
                wx.hideLoading();
              },
              fail: function (t) {
                console.log(t);
              }
            });
          }
        }), wx.showLoading({
          title: "保存中",
          mask: !0
        });
      }
    } else wx.showModal({
      title: "提示",
      content: "请输入要订阅的RSS地址",
      showCancel: !1
    });
  },

  switch4Change: function () {
    var rss_subscribe_url4 = 'https://www.reddit.com/r/Telegraph4.rss';
    this.rss_subscribe_url = rss_subscribe_url4;
    var o = this;
    this.resetItem(-1);
    var i = this.rss_subscribe_url;
    if ("http://" != i.substr(0, 7).toLowerCase() && "https://" != i.substr(0, 8).toLowerCase() && (i = "http://" + i),
      console.log("onSave:" + i), "" != i) {
      var n = s.getuid();
      if (null != n) {
        console.log("save:" + n);
        var a = t.requrl + "/rsslist/add";
        wx.login({
          success: function (t) {
            console.log("code:" + t.code), wx.request({
              url: a,
              method: "POST",
              data: {
                rss: i,
                uid: n
              },
              header: {
                "content-type": "application/json"
              },
              dataType: "json",
              success: function (t) {
                if (console.log(t), 200 == t.statusCode) {
                  var s = {};
                  s["rss[" + o.data.rss.length + "]"] = t.data, console.log(t), o.setData(s);
                } else wx.showModal({
                  title: "提示",
                  content: t.data.errmsg,
                  showCancel: !1
                });
                wx.hideLoading();
              },
              fail: function (t) {
                console.log(t);
              }
            });
          }
        }), wx.showLoading({
          title: "保存中",
          mask: !0
        });
      }
    } else wx.showModal({
      title: "提示",
      content: "请输入要订阅的RSS地址",
      showCancel: !1
    });
  },

  switch5Change: function () {
    var rss_subscribe_url5 = 'https://www.reddit.com/r/Telegraph5.rss';
    this.rss_subscribe_url = rss_subscribe_url5;
    var o = this;
    this.resetItem(-1);
    var i = this.rss_subscribe_url;
    if ("http://" != i.substr(0, 7).toLowerCase() && "https://" != i.substr(0, 8).toLowerCase() && (i = "http://" + i),
      console.log("onSave:" + i), "" != i) {
      var n = s.getuid();
      if (null != n) {
        console.log("save:" + n);
        var a = t.requrl + "/rsslist/add";
        wx.login({
          success: function (t) {
            console.log("code:" + t.code), wx.request({
              url: a,
              method: "POST",
              data: {
                rss: i,
                uid: n
              },
              header: {
                "content-type": "application/json"
              },
              dataType: "json",
              success: function (t) {
                if (console.log(t), 200 == t.statusCode) {
                  var s = {};
                  s["rss[" + o.data.rss.length + "]"] = t.data, console.log(t), o.setData(s);
                } else wx.showModal({
                  title: "提示",
                  content: t.data.errmsg,
                  showCancel: !1
                });
                wx.hideLoading();
              },
              fail: function (t) {
                console.log(t);
              }
            });
          }
        }), wx.showLoading({
          title: "保存中",
          mask: !0
        });
      }
    } else wx.showModal({
      title: "提示",
      content: "请输入要订阅的RSS地址",
      showCancel: !1
    });
  },

    onSave: function(e) {
        var o = this;
        this.resetItem(-1);
        var i = this.rss_subscribe_url;
        if ("http://" != i.substr(0, 7).toLowerCase() && "https://" != i.substr(0, 8).toLowerCase() && (i = "http://" + i), 
        console.log("onSave:" + i), "" != i) {
            var n = s.getuid();
            if (null != n) {
                console.log("save:" + n);
                var a = t.requrl + "/rsslist/add";
                wx.login({
                    success: function(t) {
                        console.log("code:" + t.code), wx.request({
                            url: a,
                            method: "POST",
                            data: {
                                rss: i,
                                uid: n
                            },
                            header: {
                                "content-type": "application/json"
                            },
                            dataType: "json",
                            success: function(t) {
                                if (console.log(t), 200 == t.statusCode) {
                                    var s = {};
                                    s["rss[" + o.data.rss.length + "]"] = t.data, console.log(t), o.setData(s);
                                } else wx.showModal({
                                    title: "提示",
                                    content: t.data.errmsg,
                                    showCancel: !1
                                });
                                wx.hideLoading();
                            },
                            fail: function(t) {
                                console.log(t);
                            }
                        });
                    }
                }), wx.showLoading({
                    title: "保存中",
                    mask: !0
                });
            }
        } else wx.showModal({
            title: "提示",
            content: "请输入要订阅的RSS地址",
            showCancel: !1
        });
    },
    tapName(event) {
      console.log("--event--")
    },
    touchX: 0,
    touchIndex: null,
    itemPos: 0,
    delwidth: 60,
    updateSpeed: 10,
    setPos: function(t, s) {
        console.log("setPos:" + t), this.itemPos = s;
        var e = "right:" + s + "px", o = {};
        o["rss[" + t.toString() + "].style"] = e, this.setData(o);
    },
    addPos: function(t, s) {
        this.itemPos += s, this.itemPos > this.delwidth ? this.itemPos = this.delwidth : this.itemPos < 0 && (this.itemPos = 0), 
        this.setPos(t, this.itemPos);
    },
    resetItem: function(t) {
        this.itemPos;
        null != this.touchIndex && this.touchIndex != t && (this.setPos(this.touchIndex, 0), 
        this.touchIndex = null, this.itemPos = 0);
    },
    updateMove: function() {
        var t;
        t = this.itemPos < this.delwidth / 2 ? -1 : 1, this.addPos(this.touchIndex, t * this.updateSpeed);
    },
    touchS: function(t) {
        if (1 == t.touches.length) {
            var s = t.target.dataset.index;
            void 0 != s && (this.resetItem(s), this.touchX = t.touches[0].clientX);
        }
    },
    touchM: function(t) {
        if (1 == t.touches.length) {
            var s = t.target.dataset.index;
            if (void 0 != s) {
                var e = t.touches[0].clientX, o = e - this.touchX;
                this.touchX = e, this.touchIndex = s, this.addPos(s, -o);
            }
        }
    },
    touchE: function(t) {
        if (0 != this.itemPos) {
            var s = this;
            !function t() {
                0 != s.itemPos && s.itemPos != s.delwidth && (s.updateMove(), setTimeout(t, 30));
            }();
        } else this.touchIndex = null;
    }
});