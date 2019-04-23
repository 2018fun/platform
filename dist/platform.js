'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 请在白鹭引擎的Main.ts中调用 platform.login() 方法调用至此处。
 */

var JPlatform = function () {
  function JPlatform() {
    _classCallCheck(this, JPlatform);
  }

  _createClass(JPlatform, [{
    key: 'initSDK',


    // name;
    // banner;
    // video;
    // infoButton;
    // infoButtonActive;

    value: function initSDK() {
      if (this.name === "wxgame") {
        this.infoButton;
        this.infoButtonActive = false;
        platform.openDataContext.postMessage({
          command: 'loadRes'
        });

        wx.showShareMenu({
          withShareTicket: true
        });
        // wx.updateShareMenu({
        //   withShareTicket: true
        // })

        //是否带有shareTicket,有的话进入群排行榜界面
        // let LaunchOption = wx.getLaunchOptionsSync();
        // console.log("LaunchOption", LaunchOption);

        wx.onShareAppMessage(function (res) {
          if (res.from === 'button') {
            console.log("来自页面内转发按钮");
            console.log(res.target);
          } else {
            console.log("来自右上角转发菜单");
          }
          return {
            title: '一起来回避生活中的尴尬事吧',
            // imageUrl: "https://tishoy.github.io/kaihi3_h5/resource/share.jpg",
            imageUrl: "https://cdn.joypac.cn/kaihi_h5_res/share.jpg",
            success: function success(res) {
              console.log("转发成功", res);
              // wx.getShareInfo({
              //   shareTicket: res.shareTickets,
              //   success: function (res) {
              //     console.log("getShareTickets", res);
              //   },
              //   fail: function (res) {
              //     console.log("getShareTickets", res);
              //   }
              // })
            },
            fail: function fail(res) {
              console.log("转发失败", res);
            }
          };
        });
      } else if (this.name === "qg") {
        qg.initAdService({
          appId: '30001041',
          isDebug: false,
          success: function success(res) {
            console.log('succ');
          },
          fail: function fail(res) {
            console.log('fail:' + res.code + res.msg);
          },
          complete: function complete(res) {
            console.log('complete:');
          }
        });
        qg.getSystemInfo({
          success: function success(res) {
            window.sysInfo = res;
            console.log(res.brand);
            console.log(res.language);
            console.log(res.model);
            console.log(res.platform);
            console.log(res.screenHeight);
            console.log(res.screenWidth);
            // ...
          },
          fail: function fail(err) {},
          complete: function complete(res) {}
        });
      } else if (this.name === "tt") {
        tt.showShareMenu({
          withShareTicket: true
        });

        console.log(tt.getSystemInfoSync());

        // wx.updateShareMenu({
        //   withShareTicket: true
        // })

        //是否带有shareTicket,有的话进入群排行榜界面

      }
    }
  }, {
    key: 'initAnalytics',
    value: function initAnalytics() {
      if (this.name === "qqplay") {
        var config = {
          gameKey: "02a2d376f1268780cdeb969e3385bae2",
          secretKey: "9b426779362d3259747c55f90ce0a40500524bcb"
        };
        return config;

        // window.GameAnalytics = window.GameAnalytics || function () { (GameAnalytics.q = GameAnalytics.q || []).push(arguments) };
        // GameAnalytics("setEnabledInfoLog", true);
        // GameAnalytics("initialize", "02a2d376f1268780cdeb969e3385bae2", "9b426779362d3259747c55f90ce0a40500524bcb");
      } else if (this.name === "wxgame") {} else if (this.name === "tt") {}
    }
  }, {
    key: 'analytics',
    value: function analytics(key, value) {
      if (this.name === "wxgame") {
        wx.aldSendEvent(key, value);
      } else if (this.name === "tt") {}
    }
  }, {
    key: 'setLifeCycleCallBack',
    value: function setLifeCycleCallBack(onPause, onResume) {
      if (this.name === "qqplay") {
        BK.QQ.listenGameEventEnterBackground({}, function () {
          if (onPause) {
            onPause();
          }
        });
        BK.QQ.listenGameEventEnterForeground({}, function () {
          if (onResume) {
            onResume();
          }
        });
      } else {
        egret.lifecycle.onPause = function () {
          onPause();
        };

        egret.lifecycle.onResume = function () {
          onResume();
        };
      }
    }
  }, {
    key: 'offsetHead',
    value: function offsetHead() {
      if (this.name === "wxgame" || this.name === "qqplay" || this.name === "tt" || this.name === "qg") {
        return Util.curWidth() / window.sysInfo.screenWidth * 350;;
      }
    }
  }, {
    key: 'setLoadingProgress',
    value: function setLoadingProgress(percent) {
      if (this.name === "oppo") {
        OPPO.setLoadingProgress(percent);
      }
    }
  }, {
    key: 'loadingComplete',
    value: function loadingComplete() {
      if (this.name === "oppo") {
        OPPO.loadingComplete();
      } else if (this.name === "mi") {
        // 游戏loading蒙层会取消

        var foo = function foo(result) {
          if (result.code === "3") {
            // 需要调用提前游戏结束的逻辑，这是例子
            XMGame.game_over({
              cost_time: 10000,
              score: 0
            });
          }
        };

        // 游戏开始
        XMGame.game_start(foo);
      }
    }
  }, {
    key: 'print',
    value: function print(msg) {
      if (this.name === "qqplay") {
        BK.Script.log(1, 1, "joypac " + msg);
      } else {
        console.log("joypac " + msg);
      }
    }
  }, {
    key: 'share',
    value: function share(title, url) {
      var iconurl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      var cb = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var extendInfo = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
      var savedPath = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "";

      if (this.name === "wxgame") {
        // if (url.indexOf("http") === -1) {
        wx.shareAppMessage({
          title: title,
          imageUrl: url
        });
        // } else {
        //     wx.shareAppMessage({
        //         title: title,
        //     })
        // }
      } else if (this.name === "qqplay") {
        // if (url.indexOf("http") === -1) {
        //     url = "GameRes://" + url
        // }
        var shareInfo = {
          summary: title, //QQ聊天消息标题
          picUrl: "", //QQ聊天消息图片
          extendInfo: extendInfo, //QQ聊天消息扩展字段
          localPicPath: "", //分享至空间、微信、朋友圈时需要的图。（选填，若无该字段，系统使用游戏对应的二维码）
          gameName: "神回避" //游戏名，暂用与生成二维码
        };

        BK.QQ.share(shareInfo, function (retCode, shareDest, isFirstShare) {
          BK.Script.log(1, 1, "joypac retCode:" + retCode + " shareDest:" + shareDest + " isFirstShare:" + isFirstShare);
          if (retCode == 0) {
            if (shareDest == 0 /* QQ */) {
                //聊天窗
                BK.Script.log(1, 1, "joypac 成功分享至QQ");
              } else if (shareDest == 1 /* QZone */) {
                //空间
                BK.Script.log(1, 1, "joypac 成功分享至空间");
              } else if (shareDest == 2 /* WX */) {
                //微信
                BK.Script.log(1, 1, "joypac 成功分享至微信");
              } else if (shareDest == 3 /* WXCircle */) {
                // 朋友圈
                BK.Script.log(1, 1, "joypac 成功分享至朋友圈");
              }
          } else if (retCode == 1) {
            BK.Script.log(1, 1, "joypac 分享失败" + retCode);
          } else if (retCode == 2) {
            BK.Script.log(1, 1, "joypac 分享失败，用户取消分享：" + retCode);
          }
        });
      } else if (this.name === "tt") {
        tt.shareAppMessage({
          title: title,
          imageUrl: url,
          withShareTicket: true
        });
      } else {}
    }
  }, {
    key: 'existRank',
    value: function existRank() {
      if (this.name === "qqplay") {
        return true;
      }
      if (this.name === "oppo") {
        return true;
      }
      if (this.name === "wxgame") {
        return true;
      }
      if (this.name === "tt") {}
      return false;
    }
  }, {
    key: 'uploadRank',
    value: function uploadRank(key, value) {
      if (this.name === "wxgame") {
        var valueStr = {
          "wxgame": {
            "card_num": value + '',
            "update_time": new Date().getTime().toString()
          }
        };
        var kvDataList = [];
        kvDataList.push({
          key: 'card_num',
          value: JSON.stringify(valueStr)
        });
        wx.getStorageInfo({
          success: function success(keys, currentSize, limitSize) {
            var hasKey = false;

            for (var i = 0; i < keys.length; i++) {
              if (keys[i] === key) {
                console.log("存在本地存储");
                wx.getStorage({
                  "key": key, //根据上传托管定义的key值进行获取 获取存储的记录
                  success: function success(res) {
                    //后面加上 ?aaa=aa.jpg 这几个字符，就能够访问到用户头像图片
                    //拿到数居 进行排序
                    // this.parseCloudRecord(data);
                    // this.recordData = res.data;
                    // this.parseCloudRecord(res.data);
                    // 对比上次成绩 再次上传


                    wx.setUserCloudStorage({
                      KVDataList: kvDataList,
                      success: function success(res) {
                        console.log("上传数据成功");
                        console.log(kvDataList);

                        wx.setStorage({
                          key: key,
                          data: valueStr,
                          success: function success(res) {
                            console.log("本地存储更新成功");
                          },
                          fail: function fail(res) {
                            console.log("本地存储更新失败");
                          },
                          complete: function complete(res) {}
                        });
                      },
                      fail: function fail(res) {},
                      complete: function complete(res) {}
                    });
                  },
                  fail: function fail(res) {},
                  complete: function complete() {}
                });
                hasKey = true;
                break;
              }
            }
            if (hasKey === false) {
              wx.setUserCloudStorage({
                KVDataList: kvDataList,
                success: function success(res) {
                  console.log(kvDataList);

                  wx.setStorage({
                    key: key,
                    data: valueStr,
                    success: function success(res) {
                      console.log("本地存储更新成功");
                    },
                    fail: function fail(res) {
                      console.log("本地存储更新失败");
                    },
                    complete: function complete(res) {}
                  });
                },
                fail: function fail(res) {},
                complete: function complete(res) {}
              });
            }
          },
          fail: function fail() {},
          complete: function complete() {}

        });
      } else if (this.name === "qqplay") {
        BK.Script.log(1, 1, value);
        var time = new Date().getTime().toString();
        var data = {
          userData: [{
            openId: GameStatusInfo.openId,
            startMs: time, //必填。 游戏开始时间。单位为毫秒，<font color=#ff0000>类型必须是字符串</font>
            endMs: new Date().getTime().toString(), //必填。 游戏结束时间。单位为毫秒，<font color=#ff0000>类型必须是字符串</font>
            scoreInfo: {
              score: value //分数，类型必须是整型数
            }
          }],
          attr: {
            score: {
              type: 'rank',
              order: 1
            }
          }
        };
        // gameMode: 游戏模式，如果没有模式区分，直接填 1
        // 必须配置好周期规则后，才能使用数据上报和排行榜功能
        BK.Script.log(1, 1, '上传分数');
        BK.QQ.uploadScoreWithoutRoom(1, data, function (errCode, cmd, data) {
          // 返回错误码信息
          if (errCode !== 0) {
            BK.Script.log(1, 1, '上传分数失败!错误码：' + errCode);
          }
        });
      } else if (this.name === "oppo") {
        OPPO.updateGameRank({
          score: value // 更新当前账号在排行榜中显示的可比较数值（整数，最大值为2147483647）
        });
      }
    }
  }, {
    key: 'getRank',
    value: function getRank(key) {
      var _this = this;

      if (this.name === "wxgame") {
        wx.getFriendCloudStorage({
          keyList: [key], //根据上传托管定义的key值进行获取 获取存储的记录
          success: function success(res) {
            //后面加上 ?aaa=aa.jpg 这几个字符，就能够访问到用户头像图片
            console.log("好友数据请求成功", res.data);
            //拿到数居 进行排序
            // this.parseCloudRecord(data);
            // this.recordData = res.data;
            // this.parseCloudRecord(res.data);
          },
          fail: function fail() {
            console.log("好友数据失败");
          },
          complete: function complete() {
            console.log("好友数据完成");
          }
        });
      } else if (this.name === "qqplay") {
        BK.Script.log(1, 1, '获取排行榜');
        return new Promise(function (resolve, reject) {
          var attr = "score"; //使用哪一种上报数据做排行，可传入score，a1，a2等
          var order = 1; //排序的方法：[ 1: 从大到小(单局)，2: 从小到大(单局)，3: 由大到小(累积)]
          var rankType = 0; //要查询的排行榜类型，0: 好友排行榜，1: 群排行榜，2: 讨论组排行榜，3: C2C二人转 (手Q 7.6.0以上支持)
          // 必须配置好周期规则后，才能使用数据上报和排行榜功能

          BK.Script.log(1, 1, '获取排行榜数据');
          BK.QQ.getRankListWithoutRoom(attr, order, rankType, function (errCode, cmd, data) {
            // 返回错误码信息
            if (errCode !== 0) {
              resolve([]);
              return;
            }
            // 解析数据
            if (data) {
              BK.Script.log(1, 1, '获取数据' + data.data.ranking_list);
              resolve(data.data.ranking_list);
              /**
               * {"nick":"哈N她!)|A(","score":5,"selfFlag":1,"url":"http://thirdqq.qlogo.cn/g?b=sdk&k=F7aCnicxWzpicK89d0gkh7cw&s=100&t=1516260478"}
               */
              // this.parseQQPlayRecord(data.data.ranking_list);
              // console.log(data.data.ranking_list);
            }
          }.bind(_this));
        });
      }
    }
  }, {
    key: 'fetchBanner',
    value: function fetchBanner() {
      var _this2 = this;

      if (this.name === "qqplay") {
        return new Promise(function (resolve, reject) {
          BK.Advertisement.fetchBannerAd(function (retCode, msg, adBannerHandle) {
            if (retCode == 0) {
              adBannerHandle.onClickContent(function () {
                BK.Script.log(1, 1, "joypac 点击了广告 msg:" + msg);
              });
              adBannerHandle.onClickClose(function () {
                BK.Script.log(1, 1, "joypac 关闭了广告 msg:" + msg);
              });
              resolve(adBannerHandle);
            } else {
              resolve(null);
              BK.Script.log(1, 1, "joypac fetchBannerAd failed. retCode:" + retCode);
            }
          }.bind(_this2));
        });
      } else if (this.name === "oppo") {
        return new Promise(function (resolve, reject) {
          var bannerAd = opUnion.createBannerAd({
            containerId: 'banner',
            posId: '33043',
            mediaId: '101000219'
          });
          bannerAd.onLoad(function (err) {
            var ad_node = document.getElementById("ad");
            ad_node.style.display = "none"; //block
            resolve(bannerAd);
          });
          bannerAd.onError(function (err) {
            var ad_node = document.getElementById("ad");
            ad_node.style.display = "none"; //block
            resolve(null);
          });
          bannerAd.addEventListener("onclick", function () {});
        });
      } else if (this.name === "wxgame") {
        return new Promise(function (resolve, reject) {
          // 微信的广告id
          var phone = wx.getSystemInfoSync();
          console.log(phone);
          var w = phone.screenWidth * 2 / 3;
          var bannerAd = wx.createBannerAd({
            adUnitId: 'adunit-78b316742ccc415e',
            style: {
              left: 0,
              top: 0,
              width: w,
              height: 80
            }
          });

          bannerAd.onError(function (err) {
            console.log(err);
          });

          bannerAd.onLoad(function () {
            console.log("bannerloaded");
          }.bind(_this2));
          resolve(bannerAd);
        });
      } else if (this.name === "qg") {
        return new Promise(function (resolve, reject) {
          var bannerAd = qg.createBannerAd({
            posId: '40689'
          });
          bannerAd.onShow(function () {
            console.log('banner 广告显示');
          });
          bannerAd.onHide(function () {
            console.log('banner 广告隐藏');
          });
          bannerAd.onError(function (err) {
            console.log(JSON.stringify(err));
          });
          resolve(bannerAd);
        });
      } else if (this.name === "tt") {
        return new Promise(function (resolve, reject) {
          var phone = tt.getSystemInfoSync();
          console.log(phone);
          var w = phone.windowWidth;
          var bannerAd = tt.createBannerAd({
            adUnitId: '13h3c2afi3a31e2ii1',
            style: {
              left: 0,
              top: 0,
              width: w
            }
          });
          bannerAd.onError(function (err) {
            console.log(err);
            reject(bannerAd);
          });
          bannerAd.onLoad(function () {
            console.log("bannerloaded");
          }.bind(_this2));
          resolve(bannerAd);
        });
      }
    }
  }, {
    key: 'showBanner',
    value: function showBanner(banner) {
      if (this.name === "qqplay") {
        if (banner === null) {
          return;
        }
        banner.show(function (succCode, msg, handle) {
          if (succCode == 0) {
            //
          } else {
            BK.Script.log(1, 1, "展示失败 msg:" + msg);
          }
        }.bind(this));
      } else if (this.name === "oppo") {
        var ad_node = document.getElementById("ad");
        ad_node.style.display = "block"; //block
      } else if (this.name === "qg") {
        banner.show();
      } else if (this.name === "wxgame") {
        var phone = wx.getSystemInfoSync();
        console.log(phone);
        var w = phone.screenWidth / 2;
        var h = phone.screenHeight;
        banner.style.left = w - banner.style.realWidth / 2;
        banner.style.top = h - banner.style.realHeight;

        banner.show();
      } else if (this.name === "tt") {
        var phone = tt.getSystemInfoSync();
        console.log(phone);
        var w = phone.screenWidth;
        var h = phone.screenHeight;
        banner.style.left = (phone.screenWidth - banner.style.width) / 2;
        banner.style.top = h - banner.style.width * 9 / 16;
        console.log(banner);
        banner.show();
      }
    }
  }, {
    key: 'hideBanner',
    value: function hideBanner(banner) {
      if (this.name === "qqplay") {
        banner.close();
      } else if (this.name === "oppo") {
        var ad_node = document.getElementById("ad");
        ad_node.style.display = "none"; //block
      } else if (this.name === "qg") {
        banner.hide();
      } else if (this.name === "wxgame") {
        banner.hide();
      } else if (this.name === "tt") {
        banner.hide();
      }
    }
  }, {
    key: 'fetchVedio',
    value: function fetchVedio() {
      var _this3 = this;

      if (this.name === "wxgame") {
        return new Promise(function (resolve, reject) {
          // 填入微信
          var rewardedVideoAd = wx.createRewardedVideoAd({
            adUnitId: 'adunit-529a787233bfd98f'
          });
          rewardedVideoAd.onError(function (err) {
            console.log(err);
            resolve(rewardedVideoAd);
          }.bind(_this3));

          var result = {
            start: false,
            finish: false
          };
          rewardedVideoAd.onClose(function (res) {
            // 用户点击了【关闭广告】按钮
            // 小于 2.1.0 的基础库版本，res 是一个 undefined
            console.log(res);
            if (res && res.isEnded || res === undefined) {
              // 正常播放结束，可以下发游戏奖励
              result.finish = true;
              console.log(result);
              this.onEnd(result);
            } else {
              console.log(result);
              this.onEnd(result);
              // 播放中途退出，不下发游戏奖励
            }
          }.bind(_this3));

          rewardedVideoAd.load().then(function () {
            return resolve(rewardedVideoAd);
          }).catch(function (err) {
            console.log(err.errMsg);
            resolve(rewardedVideoAd);
          });
        });
      } else if (this.name === "qqplay") {
        return new Promise(function (resolve, reject) {
          var videoType = 0; //激励视频广告场景 0.游戏页面挂件广告 1.游戏结算页广告 2.游戏任务广告  3.游戏复活广告 
          BK.Advertisement.fetchVideoAd(videoType, function (retCode, msg, handle) {
            if (retCode == 0) {
              AdManager.getInstance().vedioLoaded = true;
              resolve(handle);
            } else {
              AdManager.getInstance().vedioLoaded = false;
              resolve(null);
            }
          }.bind(_this3));
        });
      } else if (this.name === "oppo") {
        return new Promise(function (resolve, reject) {
          var rewardedVideoAd = opUnion.createVideoAd({
            posId: '32998',
            mediaId: '101000219'
          });
          console.log('开始视频广告加载');

          rewardedVideoAd.onLoad(function () {
            AdManager.getInstance().vedioLoaded = true;
          });

          rewardedVideoAd.onError(function (err) {
            resolve(rewardedVideoAd);
            AdManager.getInstance().vedioLoaded = false;
          });

          rewardedVideoAd.load();
          resolve(rewardedVideoAd);
        });
      } else if (this.name === "mi") {
        AdManager.getInstance().vedioLoaded = true;
      } else if (this.name === "qg") {
        return new Promise(function (resolve, reject) {
          var rewardedVideoAd = qg.createRewardedVideoAd({
            posId: '40690'
          });
          rewardedVideoAd.onLoad(function () {
            AdManager.getInstance().vedioLoaded = true;
            console.log('joypac 激励视频加载成功');
            // rewardedVideoAd.show()
          });
          rewardedVideoAd.onError(function (err) {
            AdManager.getInstance().vedioLoaded = false;
            console.log("joypac " + JSON.stringify(err));
          });
          resolve(rewardedVideoAd);
        });
      } else if (this.name === "tt") {
        return new Promise(function (resolve, reject) {
          // 填入微信
          var rewardedVideoAd = tt.createRewardedVideoAd({
            adUnitId: '85bj580aa8hge1dj8i'
          });

          rewardedVideoAd.onError(function (err) {
            console.log(err);
            resolve(rewardedVideoAd);
          }.bind(_this3));

          var result = {
            start: false,
            finish: false
          };

          rewardedVideoAd.onClose(function (res) {
            // 用户点击了【关闭广告】按钮
            // 小于 2.1.0 的基础库版本，res 是一个 undefined
            if (res && res.isEnded || res === undefined) {
              // 正常播放结束，可以下发游戏奖励
              result.finish = true;
              console.log(result);
              this.onEnd(result);
            } else {
              console.log(result);
              this.onEnd(result);
              // 播放中途退出，不下发游戏奖励
            }
          }.bind(_this3));

          rewardedVideoAd.load().then(function () {
            return resolve(rewardedVideoAd);
          }).catch(function (err) {
            console.log(err.errMsg);
            resolve(rewardedVideoAd);
          });
        });
      }
    }
  }, {
    key: 'reloadVedio',
    value: function reloadVedio(vedio) {
      vedio.load();
    }
  }, {
    key: 'vedioPlay',
    value: function vedioPlay(vedio, onPlay, onEnd) {
      if (this.name === "qqplay") {
        // return new Promise((resolve, reject) => {\
        var result = {
          start: false,
          finish: false
        };
        vedio.setEventCallack(function (code, msg) {
          BK.Script.log(1, 1, "closeGame"); //关闭游戏（不再使用不需要监听） 
        }.bind(this), function (code, msg) {
          if (code === 0) {
            result.finish = true;
            //达到看广告时长要求，可以下发奖励 
          } else {}
        }.bind(this), function (code, msg) {
          if (code === 0) {
            onEnd(result);
            // resolve(result);//关闭视频webview 
          } else {}
        }.bind(this), function (code, msg) {
          if (code === 0) {
            // result.start = true;
            // resolve(result);
            //开始播放视频 
            onPlay();
          } else {}
        }.bind(this));
        vedio.jump();
        // });
        // if (args.length === 3) {

        // }
      }
      if (this.name === "wxgame") {

        // vedio.onClose(function (res) {
        //   // 用户点击了【关闭广告】按钮
        //   // 小于 2.1.0 的基础库版本，res 是一个 undefined
        //   if (res && res.isEnded || res === undefined) {
        //     // 正常播放结束，可以下发游戏奖励
        //     result.finish = true;
        //     console.log(result);
        //     onEnd(result);
        //   } else {
        //     console.log(result);
        //     onEnd(result);
        //     // 播放中途退出，不下发游戏奖励
        //   }
        // }.bind(this))
        platform.onEnd = onEnd;
        vedio.show().then(function () {
          onPlay();
        }.bind(this)).catch(function (err) {
          return vedio.load().then(function () {
            return vedio.show();
          });
        });
      }
      if (this.name === "oppo") {
        var result = {
          start: false,
          finish: false
        };
        vedio.onClose(function (res) {
          SoundManager.getInstance().playBGM();
          egret.ticker.resume();
          if (res && res.isEnded) {
            result.finish = true;
            console.log(result);
            onEnd(result);
          } else {
            console.log(result);
            onEnd(result);
          }
        });
        vedio.show().then(function () {
          onPlay();
        }, function () {}).catch(function (err) {
          vedio.load().then(function () {
            vedio.show();
          });
        }, function () {});
      }
      if (this.name === "mi") {
        var content = {
          adType: '1',
          adId: '21c9f49ceec061102301'
        };
        console.log("joypac播放视频");
        XMGame.game_show_ad(content, function (adData) {
          console.log("joypac" + adData.result);
          console.log("joypac" + adData.hasGetAd);
          onPlay();
          if (adData.hasGetAd) {
            if (adData.result) {
              onEnd({
                finish: true
              });
            } else {
              onEnd({
                finish: false
              });
            }
          } else {
            onEnd({
              finish: false
            });
          }
        });
      }
      if (this.name === "qg") {
        vedio.onVideoStart(function () {
          onPlay();
          console.log('激励视频 开始播放');
        });
        vedio.onRewarded(function () {
          onEnd({
            finish: true
          });
          console.log('激励视频广告完成，发放奖励');
          vedio.load();
        });
        vedio.show();
      }
      if (this.name === "tt") {

        this.onEnd = onEnd;

        vedio.show().then(function () {
          onPlay();
        }.bind(this)).catch(function (err) {
          return vedio.load().then(function () {
            return vedio.show();
          });
        });
      }
    }
  }, {
    key: 'fetchInterstitial',
    value: function fetchInterstitial() {
      if (this.name === "oppo") {
        return new Promise(function (resolve, reject) {
          var interstitialAd = opUnion.createInterstitialAd({
            posId: '33044',
            mediaId: '101000219'
          });
          console.log('开始插屏广告加载');

          interstitialAd.onLoad(function () {
            // resolve(interstitialAd);
            // interstitialAd.offLoad();

          });

          interstitialAd.onError(function (err) {
            // resolve(null);

          });

          resolve(interstitialAd);
        });
      } else if (this.name === "qg") {
        return new Promise(function (resolve, reject) {
          var interstitialAd = qg.createInsertAd({
            posId: '40691'
          });
          interstitialAd.onLoad(function () {
            console.log('joypac 插屏广告加载');
          });
          interstitialAd.onError(function (err) {
            console.log("joypac 插屏错误" + JSON.stringify(err));
            interstitialAd.load();
          });
          interstitialAd.load();
          resolve(interstitialAd);
        });
      }
    }
  }, {
    key: 'showInterstitial',
    value: function showInterstitial(interstitialAd) {
      if (this.name === "oppo") {
        interstitialAd.onClose(function () {
          SoundManager.getInstance().playBGM();
          egret.ticker.resume();
        }.bind(this));
        interstitialAd.show().catch(function (err) {
          interstitialAd.load().then(function () {
            interstitialAd.show();
          });
        }, function () {});
      }
      if (this.name === "qg") {
        console.log("joypac 显示插屏");
        interstitialAd.onShow(function () {
          console.log('插屏广告展示');
          interstitialAd.load();
        });
        interstitialAd.show();
      }
    }
  }, {
    key: 'getUserInfo',
    value: function getUserInfo() {
      if (this.name === "wxgame") {
        wx.getUserInfo({
          withCredentials: true,
          success: function success(res) {
            var userInfo = res.userInfo;
            var nickName = userInfo.nickName;
            var avatarUrl = userInfo.avatarUrl;
            var gender = userInfo.gender; //性别 0：未知、1：男、2：女
            var province = userInfo.province;
            var city = userInfo.city;
            var country = userInfo.country;
            resolve(userInfo);
          }
        });
      } else if (this.name === "mi") {
        // 获取用户头像和名称等信息

        var callback = function callback(userInfo) {
          if (userInfo && Object.prototype.toString.call(userInfo) === '[object Object]') {
            console.log(userInfo);
            console.log(userInfo.nickName);
            console.log(userInfo.avatar); // url
            console.log('获取到了用户数据');
          }
        };

        //获取用户信息
        XMGame.get_userinfo(callback);
      }
    }
  }, {
    key: 'login',
    value: function login() {
      if (this.name === "wxgame") {
        wx.login({
          success: function success(res) {
            var recordChannel = egret.localStorage.getItem("channel");
            if (recordChannel === undefined || recordChannel === "") {
              wx.aldSendEvent('渠道导入', {
                'channel': window.channel
              });
              wx.getSystemInfo({
                success: function success(res) {
                  wx.aldSendEvent(recordChannel + '设备信息', {
                    'brand': res.brand,
                    'model': res.model,
                    "version": res.version
                  });
                }
              });
              wx.getNetworkType({
                success: function success(res) {
                  var networkType = res.networkType;
                  wx.aldSendEvent(recordChannel + '网络类型', {
                    networkType: res.networkType
                  });
                }
              });
              egret.localStorage.setItem("channel", window.channel);
              if (window.channel.indexOf("mintegral") !== -1) {
                wx.getUserInfo({
                  success: function success(res) {
                    console.log("获取用户信息成功");
                    var userInfo = res.userInfo;
                    var nickName = userInfo.nickName;
                    var avatarUrl = userInfo.avatarUrl;
                    var gender = userInfo.gender; //性别 0：未知、1：男、2：女
                    var province = userInfo.province;
                    var city = userInfo.city;
                    var country = userInfo.country;
                  },
                  fail: function fail(res) {
                    console.log("获取用户信息失败");
                    var sysInfo = wx.getSystemInfoSync();
                    var sdkVersion = sysInfo.SDKVersion;
                    if (sdkVersion >= "2.0.1") {
                      var width = window.innerWidth / 2 - 80;
                      var height = window.innerHeight * 3 / 4 - 20;
                      console.log(width);
                      console.log(height);
                      platform.infoButtonActive = true;
                      platform.infoButton = wx.createUserInfoButton({
                        type: 'image',
                        text: '',
                        image: "./timg.png",
                        style: {
                          left: 0,
                          top: 0,
                          width: window.innerWidth,
                          height: window.innerHeight,
                          backgroundColor: '#ff0000',
                          color: '#ffffff'
                        }
                      });
                      platform.infoButton.onTap(function (res) {
                        if (res.userInfo) {
                          console.log("用户授权:", res);
                          var userInfo = res.userInfo;
                          var nickName = userInfo.nickName;
                          var avatarUrl = userInfo.avatarUrl;
                          var gender = userInfo.gender; //性别 0：未知、1：男、2：女
                          var province = userInfo.province;
                          var city = userInfo.city;
                          var country = userInfo.country;
                          platform.infoButton.destroy();
                          console.log("授权成功");
                          platform.infoButtonActive = false;
                          wx.aldSendEvent('授权成功', {
                            'Channel': window.channel
                          });
                        } else {
                          platform.infoButton.destroy();
                          console.log("授权失败");
                          platform.infoButtonActive = false;
                          wx.aldSendEvent('授权失败', {
                            'Channel': window.channel
                          });
                        }
                      });
                    } else {
                      wx.showModal({
                        title: '友情提醒',
                        content: '请允许获取用户信息',
                        confirmText: "授权",
                        showCancel: false,
                        success: function success(res) {
                          if (res.confirm) {
                            console.log('用户点击确定');
                            wx.authorize({
                              scope: 'scope.userInfo',
                              success: function success() {
                                console.log("授权成功");
                                wx.aldSendEvent('授权成功', {
                                  'Channel': window.channel
                                });
                              },

                              fail: function fail(res) {
                                console.log("授权失败");
                                wx.aldSendEvent('授权失败', {
                                  'Channel': window.channel
                                });
                              }
                            });
                          } else if (res.cancel) {
                            console.log('用户点击取消');
                            wx.aldSendEvent('授权失败', {
                              'Channel': window.channel
                            });
                          }
                        }
                      });
                    }
                  }
                });
              }
            }
          },
          fail: function fail(res) {
            console.log(res);
          },
          complete: function complete(res) {
            console.log(res);
          }
        });
      } else if (this.name === "tt") {
        tt.login({
          success: function success(res) {
            console.log('login\u8C03\u7528\u6210\u529F' + res.code + ' ' + res.anonymousCode);
          },
          fail: function fail(res) {
            console.log('login\u8C03\u7528\u5931\u8D25');
          }
        });
      }
    }
  }, {
    key: 'getGameRecorderManager',
    value: function getGameRecorderManager() {
      if (this.platform.name === "tt") {
        return tt.getGameRecorderManager();
      }
    }
  }, {
    key: 'stopRecord',
    value: function stopRecord() {
      console.log("stop");
      if (platform.name === "tt") {
        tt.getGameRecorderManager().stop();
      }
    }
  }, {
    key: 'pauseRecord',
    value: function pauseRecord() {
      console.log("pause");
      if (platform.name === "tt") {
        tt.getGameRecorderManager().pause();
      }
    }
  }, {
    key: 'resumeRecord',
    value: function resumeRecord() {
      console.log("resume");
      if (platform.name === "tt") {
        tt.getGameRecorderManager().resume();
      }
    }
  }, {
    key: 'startRecord',
    value: function startRecord() {
      if (platform.name === "tt") {
        console.log("录屏开始");
        tt.getGameRecorderManager().onStart(function (res) {
          // 录屏开始
          console.log(res);
          console.log(res.microphoneStatus);
          // do somethine;
        });

        tt.getGameRecorderManager().onStop(function (res) {
          console.log("onStop");
          tt.getGameRecorderManager().clipVideo({
            path: res.videoPath,
            timeRange: [120, 0], // 表示裁剪录屏中的最后10s
            success: function success(res) {
              console.log(res.videoPath);
              tt.setStorage({
                key: 'videoPath',
                data: res.videoPath,
                success: function success(res) {
                  console.log('setStorage\u8C03\u7528\u6210\u529F');
                },
                fail: function fail(res) {
                  console.log('setStorage\u8C03\u7528\u5931\u8D25');
                }
              });
            },
            fail: function fail(e) {}
          });
          // 录屏结束;
        });

        tt.getGameRecorderManager().onPause(function () {
          console.log("onPause");
          // 录屏已暂停;
        });

        tt.getGameRecorderManager().onResume(function () {
          console.log("onResume");
          // 录屏已恢复;
        });

        console.log("recorder start");

        tt.getGameRecorderManager().start({
          duration: 30,
          microphoneEnabled: false
        });
      }
    }
  }, {
    key: 'shareVedio',
    value: function shareVedio(onShare) {
      if (platform.name === "tt") {
        var appname = tt.getSystemInfoSync().appName;
        if (appname === "Douyin") {
          onShare();
        }
        tt.getStorage({
          key: 'videoPath',
          success: function success(res) {
            console.log(res);
            var titles = ["脑细胞快用光了，快来帮帮我", "这关太难了，求老铁们帮帮忙"];
            var randomNum = Math.floor(Math.random(2));
            console.log(titles[randomNum]);
            if (res.data) {
              tt.shareAppMessage({
                title: "脑细胞快用光了，快来帮帮我",
                channel: "video",
                extra: {
                  "videoPath": res.data,
                  "videoTopic": "回避不开心"
                },
                success: function success() {
                  onShare();
                  console.log('\u5206\u4EAB\u6210\u529F\uFF01');
                },
                fail: function fail(e) {
                  var title = "";
                  if (e.errMsg.indexOf("3s") !== -1 || e.errMsg.indexOf("too short") !== -1) {
                    title += '视频太短啦\n请再次游戏重新录制';
                    tt.showToast({
                      title: title,
                      icon: 'none',
                      duration: 2000,
                      success: function success(res) {
                        console.log('' + res);
                      },
                      fail: function fail(res) {
                        console.log('showToast\u8C03\u7528\u5931\u8D25');
                      }
                    });
                  } else if (e.errMsg.indexOf("")) {
                    // title += '分享失败啦\n您取消了该次分享'
                  }
                  console.log('\u5206\u4EAB\u5931\u8D25\uFF01');
                }
              });
              // tt.shareVideo({
              //   videoPath: res.data,
              //   success() {
              //     onShare();
              //     console.log(`分享成功！`);
              //   },
              //   fail(e) {
              //     console.log(`分享失败！`);
              //   }
              // })
              // request ad data
            }
          },
          fail: function fail(res) {
            console.log('getStorage\u8C03\u7528\u5931\u8D25');
          }
        });
      }
    }
  }, {
    key: 'showTip',
    value: function showTip(title) {
      tt.showToast({
        title: title,
        icon: 'none',
        duration: 2000,
        success: function success(res) {
          console.log('' + res);
        },
        fail: function fail(res) {
          console.log('showToast\u8C03\u7528\u5931\u8D25');
        }
      });
    }
  }, {
    key: 'getSaveData',
    value: function getSaveData() {}
  }, {
    key: 'setSaveData',
    value: function setSaveData() {}
  }, {
    key: 'rankView',
    value: function rankView() {
      var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (this.name === "wxgame") {
        // if (show) {
        //     platform.openDataContext.postMessage({
        //         isDisplay: true,
        //         text: 'hello',
        //         year: (new Date()).getFullYear(),
        //         command: "open"
        //     });
        // } else {
        //     platform.openDataContext.postMessage({
        //         isDisplay: false,
        //         text: 'hello',
        //         year: (new Date()).getFullYear(),
        //         command: "close"
        //     });
        // }
      } else if (this.name === "oppo") {
        OPPO.openRankPage();
      } else {
        UIManager.getInstance().toRankScene();
      }
    }
  }, {
    key: 'loadNextStage',
    value: function loadNextStage(stage) {
      if (this.name === "qqplay") {
        if (stage <= 30) {
          RES.loadConfig("stage" + stage + ".res.json", "https://cdn.joypac.cn/kaihi_h5_res/");
          // 'RES.loadConfig("stage21.res.json", "https://games.tishoy.com/kaihi3_h5/resource/")'
        }
      } else if (this.name === "wxgame") {
        if (stage <= 30) {
          RES.loadConfig("stage" + stage + ".res.json", "https://cdn.joypac.cn/kaihi_h5_res/");
          // 'RES.loadConfig("stage21.res.json", "https://games.tishoy.com/kaihi3_h5/resource/")'
        }
      }
    }
  }, {
    key: 'hasBannerSDK',
    value: function hasBannerSDK() {
      switch (this.name) {
        case "wxgame":
          return true;
        case "qqplay":
          return true;
        case "oppo":
          return true;
        case "mi":
          return false;
        case "qg":
          return true;
        case "tt":
          return true;
        default:
          return false;
      }
    }
  }, {
    key: 'hasInterstitialSDK',
    value: function hasInterstitialSDK() {
      switch (this.name) {
        case "wxgame":
          return false;
        case "qqplay":
          return false;
        case "oppo":
          return true;
        case "mi":
          return false;
        case "qg":
          return true;
        case "tt":
          return false;
        default:
          return false;
      }
    }
  }, {
    key: 'hasVedioSDK',
    value: function hasVedioSDK() {
      switch (this.name) {
        case "wxgame":
          return true;
        case "qqplay":
          return true;
        case "oppo":
          return true;
        case "mi":
          return true;
        case "qg":
          return true;
        case "tt":
          return true;
        default:
          return false;
      }
    }
  }, {
    key: 'hasShareSDK',
    value: function hasShareSDK() {
      switch (this.name) {
        case "wxgame":
          return true;
        case "qqplay":
          return true;
        case "oppo":
          return false;
        case "mi":
          return false;
        case "qg":
          return false;
        case "tt":
          return true;
        default:
          return false;
      }
    }
  }, {
    key: 'hasShareVedioSDK',
    value: function hasShareVedioSDK() {
      switch (this.name) {
        case "wxgame":
          return false;
        case "qqplay":
          return false;
        case "oppo":
          return false;
        case "mi":
          return false;
        case "qg":
          return false;
        case "tt":
          return true;
        default:
          return false;
      }
    }
    // openDataContext = new WxgameOpenDataContext();

  }]);

  return JPlatform;
}();

var WxgameOpenDataContext = function () {
  function WxgameOpenDataContext() {
    _classCallCheck(this, WxgameOpenDataContext);
  }

  _createClass(WxgameOpenDataContext, [{
    key: 'createDisplayObject',
    value: function createDisplayObject(type, width, height) {
      var bitmapdata = new egret.BitmapData(sharedCanvas);
      bitmapdata.$deleteSource = false;
      var texture = new egret.Texture();
      texture._setBitmapData(bitmapdata);
      var bitmap = new egret.Bitmap(texture);
      bitmap.width = width;
      bitmap.height = height;

      if (egret.Capabilities.renderMode == "webgl") {
        var renderContext = egret.wxgame.WebGLRenderContext.getInstance();
        var context = renderContext.context;
        ////需要用到最新的微信版本
        ////调用其接口WebGLRenderingContext.wxBindCanvasTexture(number texture, Canvas canvas)
        ////如果没有该接口，会进行如下处理，保证画面渲染正确，但会占用内存。
        if (!context.wxBindCanvasTexture) {
          egret.startTick(function (timeStarmp) {
            egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
            bitmapdata.webGLTexture = null;
            return false;
          }, this);
        }
      }
      return bitmap;
    }
  }, {
    key: 'postMessage',
    value: function postMessage(data) {
      var openDataContext = wx.getOpenDataContext();
      openDataContext.postMessage(data);
    }
  }]);

  return WxgameOpenDataContext;
}();

/**
 * 发布后，拷入该平台，只需要更换具体平台名称的
 */
// WXGAME = 'wxgame';
// QQPLAY = 'qqplay';
// OPPO = 'oppo';
// MI = 'mi'

window.platform = new JPlatform();
window.platform.name = "wxgame";
window.platform.openDataContext = new WxgameOpenDataContext();