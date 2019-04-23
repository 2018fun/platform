/**
 * 请在白鹭引擎的Main.ts中调用 platform.login() 方法调用至此处。
 */

class JPlatform {


    // name;
    // banner;
    // video;

    initAnalytics() {

    }

    setLifeCycleCallBack(onPause, onResume) {

        egret.lifecycle.onPause = () => {
            onPause();
        }

        egret.lifecycle.onResume = () => {
            onResume();
        }
    }

    setLoadingProgress(percent) {

    }

    loadingComplete() {
        XMGame.game_start(() => {
            if (result.code === "3") {
                XMGame.game_over({
                    cost_time: 10000,
                    score: 0
                })
            }

        });
    }

    print(msg) {
        console.log("joypac " + msg);
    }

    share(title, url, iconurl = "", cb = null, extendInfo = "", savedPath = "") {

    }

    existRank() {
        return false;
    }

    uploadRank(key, value) {

    }

    getRank(key) {

    }

    async fetchBanner() {

    }

    async showBanner(banner) {

    }

    async hideBanner(banner) {

    }

    async fetchVedio() {
        if (this.name === "mi") {
            AdManager.getInstance().vedioLoaded = true;
        }
    }

    async reloadVedio(vedio) {
        vedio.load();
    }

    async vedioPlay(vedio, onPlay, onEnd) {

        var content = {
            adType: '1',
            adId: ''
        }
        XMGame.game_show_ad(content, function (adData) {
            console.log(adData.result);
            console.log(adData.hasGetAd);
        })
    }

    async fetchInterstitial() {
        if (this.name === "oppo") {
            return new Promise((resolve, reject) => {
                var interstitialAd = opUnion.createInterstitialAd({
                    posId: '33044',
                    mediaId: '101000219'
                })
                console.log('开始插屏广告加载');

                interstitialAd.onLoad(function () {
                    // resolve(interstitialAd);
                    // interstitialAd.offLoad();

                })

                interstitialAd.onError(function (err) {
                    // resolve(null);

                })

                resolve(interstitialAd);
            })
        }
    }

    async showInterstitial(interstitialAd) {
        if (this.name === "oppo") {
            interstitialAd.onClose(function () {
                SoundManager.getInstance().playBGM();
                egret.ticker.resume();
            }.bind(this))
            interstitialAd.show().catch(function (err) { interstitialAd.load().then(function () { interstitialAd.show() }) }, () => { })
        }
    }

    getUserInfo() {
        if (this.name === "wxgame") {
            wx.getUserInfo({
                withCredentials: true,
                success: function (res) {
                    var userInfo = res.userInfo
                    var nickName = userInfo.nickName
                    var avatarUrl = userInfo.avatarUrl
                    var gender = userInfo.gender //性别 0：未知、1：男、2：女
                    var province = userInfo.province
                    var city = userInfo.city
                    var country = userInfo.country
                    resolve(userInfo);
                }
            })
        } else if (this.name === "mi") {
            //获取用户信息
            XMGame.get_userinfo(callback) // 获取用户头像和名称等信息

            function callback(userInfo) {
                if (userInfo && Object.prototype.toString.call(userInfo) === '[object Object]') {
                    console.log(userInfo)
                    console.log(userInfo.nickName)
                    console.log(userInfo.avatar) // url
                    console.log('获取到了用户数据')
                }
            }

        }


    }

    login() {
        return new Promise((resolve, reject) => {
            wx.login({
                success: (res) => {
                    resolve(res)
                }
            })
        })
    }

    getSaveData() {

    }

    setSaveData() {

    }

    rankView(show = true) {
        if (this.name === "wxgame") {
            if (show) {
                platform.openDataContext.postMessage({
                    isDisplay: true,
                    text: 'hello',
                    year: (new Date()).getFullYear(),
                    command: "open"
                });
            } else {
                platform.openDataContext.postMessage({
                    isDisplay: false,
                    text: 'hello',
                    year: (new Date()).getFullYear(),
                    command: "close"
                });
            }

        } else if (this.name === "oppo") {
            OPPO.openRankPage();
        } else {
            UIManager.getInstance().toRankScene();
        }
    }

    loadNextStage(stage) {
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

    hasBannerSDK() {
        return false;
    }

    hasInterstitialSDK() {
        return false;
    }

    hasVedioSDK() {
        return false;
    }

    hasShareSDK() {
        return false;
    }
    // openDataContext = new WxgameOpenDataContext();
}

class WxgameOpenDataContext {

    createDisplayObject(type, width, height) {
        const bitmapdata = new egret.BitmapData(sharedCanvas);
        bitmapdata.$deleteSource = false;
        const texture = new egret.Texture();
        texture._setBitmapData(bitmapdata);
        const bitmap = new egret.Bitmap(texture);
        bitmap.width = width;
        bitmap.height = height;

        if (egret.Capabilities.renderMode == "webgl") {
            const renderContext = egret.wxgame.WebGLRenderContext.getInstance();
            const context = renderContext.context;
            ////需要用到最新的微信版本
            ////调用其接口WebGLRenderingContext.wxBindCanvasTexture(number texture, Canvas canvas)
            ////如果没有该接口，会进行如下处理，保证画面渲染正确，但会占用内存。
            if (!context.wxBindCanvasTexture) {
                egret.startTick((timeStarmp) => {
                    egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
                    bitmapdata.webGLTexture = null;
                    return false;
                }, this);
            }
        }
        return bitmap;
    }


    postMessage(data) {
        const openDataContext = wx.getOpenDataContext();
        openDataContext.postMessage(data);
    }
}

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