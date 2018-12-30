var o = require("./pages/common/config.js");

App({
    globalData: {
        userInfo: null,
        chapter: null
    },
    savechapter: function(o) {
        this.globalData.chapter = o;
    },
    getuid: function() {
        var o = wx.getStorageSync("uid");
        return console.log("getuid:" + o), "" == o || void 0 == o ? (wx.showModal({
            title: "获取用户ID",
            content: "无法获取用户ID，请重新授权登录",
            showCancel: !1
        }), null) : o;
    },
    login: function(e) {
        var n = wx.getStorageSync("uid");
        if ("" == n || void 0 == n) {
            var a = o.requrl + "/userinfo/getid";
            wx.login({
                success: function(o) {
                    console.log("code:" + o.code), wx.request({
                        url: a,
                        data: {
                            code: o.code
                        },
                        header: {
                            "content-type": "application/json"
                        },
                        dataType: "json",
                        success: function(o) {
                            var n = o.data;
                            console.log("uid", n.uid), console.log(o), wx.setStorageSync("uid", n.uid), wx.hideLoading(), 
                            void 0 != e && e();
                        },
                        fail: function(o) {
                            console.log(o);
                        }
                    });
                }
            }), wx.showLoading({
                title: "登录中",
                mask: !0
            });
        } else void 0 != e && e();
    },
    onLaunch: function() {
        var o = this;
        this.login(), wx.getUserInfo({
            success: function(e) {
                o.globalData.userInfo = e.userInfo, o.userInfoReadyCallback && o.userInfoReadyCallback(e);
            }
        });
    }
});