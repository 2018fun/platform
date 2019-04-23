"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 请在白鹭引擎的Main.ts中调用 platform.login() 方法调用至此处。
 */

var JPlatform = function () {
    function JPlatform() {
        _classCallCheck(this, JPlatform);
    }

    _createClass(JPlatform, [{
        key: "initAnalytics",


        // name;
        // banner;
        // video;

        value: function initAnalytics() {}
    }, {
        key: "setLifeCycleCallBack",
        value: function setLifeCycleCallBack(onPause, onResume) {

            egret.lifecycle.onPause = function () {
                onPause();
            };

            egret.lifecycle.onResume = function () {
                onResume();
            };
        }
    }, {
        key: "setLoadingProgress",
        value: function setLoadingProgress(percent) {}
    }, {
        key: "loadingComplete",
        value: function loadingComplete() {
            XMGame.game_start(function () {
                if (result.code === "3") {
                    XMGame.game_over({
                        cost_time: 10000,
                        score: 0
                    });
                }
            });
        }
    }, {
        key: "print",
        value: function print(msg) {
            console.log("joypac " + msg);
        }
    }, {
        key: "share",
        value: function share(title, url) {
            var iconurl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
            var cb = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
            var extendInfo = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
            var savedPath = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "";
        }
    }, {
        key: "existRank",
        value: function existRank() {
            return false;
        }
    }, {
        key: "uploadRank",
        value: function uploadRank(key, value) {}
    }, {
        key: "getRank",
        value: function getRank(key) {}
    }, {
        key: "fetchBanner",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function fetchBanner() {
                return _ref.apply(this, arguments);
            }

            return fetchBanner;
        }()
    }, {
        key: "showBanner",
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(banner) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function showBanner(_x5) {
                return _ref2.apply(this, arguments);
            }

            return showBanner;
        }()
    }, {
        key: "hideBanner",
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(banner) {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function hideBanner(_x6) {
                return _ref3.apply(this, arguments);
            }

            return hideBanner;
        }()
    }, {
        key: "fetchVedio",
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                if (this.name === "mi") {
                                    AdManager.getInstance().vedioLoaded = true;
                                }

                            case 1:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function fetchVedio() {
                return _ref4.apply(this, arguments);
            }

            return fetchVedio;
        }()
    }, {
        key: "reloadVedio",
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(vedio) {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                vedio.load();

                            case 1:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function reloadVedio(_x7) {
                return _ref5.apply(this, arguments);
            }

            return reloadVedio;
        }()
    }, {
        key: "vedioPlay",
        value: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(vedio, onPlay, onEnd) {
                var content;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                content = {
                                    adType: '1',
                                    adId: ''
                                };

                                XMGame.game_show_ad(content, function (adData) {
                                    console.log(adData.result);
                                    console.log(adData.hasGetAd);
                                });

                            case 2:
                            case "end":
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function vedioPlay(_x8, _x9, _x10) {
                return _ref6.apply(this, arguments);
            }

            return vedioPlay;
        }()
    }, {
        key: "fetchInterstitial",
        value: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                if (!(this.name === "oppo")) {
                                    _context7.next = 2;
                                    break;
                                }

                                return _context7.abrupt("return", new Promise(function (resolve, reject) {
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
                                }));

                            case 2:
                            case "end":
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function fetchInterstitial() {
                return _ref7.apply(this, arguments);
            }

            return fetchInterstitial;
        }()
    }, {
        key: "showInterstitial",
        value: function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(interstitialAd) {
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
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

                            case 1:
                            case "end":
                                return _context8.stop();
                        }
                    }
                }, _callee8, this);
            }));

            function showInterstitial(_x11) {
                return _ref8.apply(this, arguments);
            }

            return showInterstitial;
        }()
    }, {
        key: "getUserInfo",
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
        key: "login",
        value: function login() {
            return new Promise(function (resolve, reject) {
                wx.login({
                    success: function success(res) {
                        resolve(res);
                    }
                });
            });
        }
    }, {
        key: "getSaveData",
        value: function getSaveData() {}
    }, {
        key: "setSaveData",
        value: function setSaveData() {}
    }, {
        key: "rankView",
        value: function rankView() {
            var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            if (this.name === "wxgame") {
                if (show) {
                    platform.openDataContext.postMessage({
                        isDisplay: true,
                        text: 'hello',
                        year: new Date().getFullYear(),
                        command: "open"
                    });
                } else {
                    platform.openDataContext.postMessage({
                        isDisplay: false,
                        text: 'hello',
                        year: new Date().getFullYear(),
                        command: "close"
                    });
                }
            } else if (this.name === "oppo") {
                OPPO.openRankPage();
            } else {
                UIManager.getInstance().toRankScene();
            }
        }
    }, {
        key: "loadNextStage",
        value: function loadNextStage(stage) {
            if (this.name === "qqplay") {
                if (stage <= 30) {
                    RES.loadConfig("stage" + stage + ".res.json", "https://games.tishoy.com/kaihi3_h5/resource/");
                    // 'RES.loadConfig("stage21.res.json", "https://games.tishoy.com/kaihi3_h5/resource/")'
                }
            } else if (this.name === "wxgame") {
                if (stage <= 30) {
                    RES.loadConfig("stage" + stage + ".res.json", "https://games.tishoy.com/kaihi3_h5/resource/");
                    // 'RES.loadConfig("stage21.res.json", "https://games.tishoy.com/kaihi3_h5/resource/")'
                }
            }
        }
    }, {
        key: "hasBannerSDK",
        value: function hasBannerSDK() {
            return false;
        }
    }, {
        key: "hasInterstitialSDK",
        value: function hasInterstitialSDK() {
            return false;
        }
    }, {
        key: "hasVedioSDK",
        value: function hasVedioSDK() {
            return false;
        }
    }, {
        key: "hasShareSDK",
        value: function hasShareSDK() {
            return false;
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
        key: "createDisplayObject",
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
        key: "postMessage",
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
window.platform.name = "mi";
window.platform.openDataContext = new WxgameOpenDataContext();