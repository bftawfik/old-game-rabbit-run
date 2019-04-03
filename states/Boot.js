var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var RabbitRunGame;
(function (RabbitRunGame) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super.call(this) || this;
        }
        //init(customParam1, customParam2)
        //{
        //	this.customParam1 = customParam1;
        //	console.log(customParam1);
        //}
        Boot.prototype.preload = function () {
            this.updateGameScale();
            //
            this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
            this.loadResources();
        };
        Boot.prototype.create = function () {
            //console.log('create');
            this.createGameVars();
        };
        Boot.prototype.update = function () {
            if (this.ready) {
                this.game.state.start('MainPreloader');
            }
        };
        Boot.prototype.updateGameScale = function () {
        };
        Boot.prototype.onLoadComplete = function () {
            //console.log('onLoadComplete');
            this.ready = true;
        };
        Boot.prototype.loadResources = function () {
            //console.log('loadResources');
            this.game.load.image('preloaderBg_img', './assets/imgs/main/preloaderBg.jpg');
            this.game.load.image('orient_img', './assets/imgs/main/orient.jpg');
            this.game.load.image('preloaderBar0_img', './assets/imgs/main/preloaderBar0.png');
            this.game.load.image('preloaderBar1_img', './assets/imgs/main/preloaderBar1.png');
        };
        Boot.prototype.checkIfMobilePhone = function () {
            var ua = navigator.userAgent;
            var kindle = new RegExp(/Kindle|Silk|KFTT|KFOT|KFJWA|KFJWI|KFSOWI|KFTHWA|KFTHWI|KFAPWA|KFAPWI/);
            var blackBerry = new RegExp(/BlackBerry|bb|PlayBook/);
            var ios = new RegExp(/iPad|iPhone|iPod/);
            var android = new RegExp(/Android/);
            var rest = new RegExp(/webOS|IEMobile|Opera Mini/);
            var allMobilePhones = new RegExp(kindle.source + "|" + blackBerry.source + "|" + ios.source + "|" + android.source + "|" + rest.source, "i");
            var isMobilePhone = allMobilePhones.test(ua);
            return isMobilePhone;
        };
        Boot.prototype.createGameVars = function () {
            this.globalVars = {
                mobileDevice: this.checkIfMobilePhone(),
                sound: {
                    music: 1,
                    effects: 1,
                },
                levelsTotalCount: 8,
                score: 0,
                new: 1
            };
        };
        Boot.prototype.setGlobalVars = function (gVars) {
            this.globalVars = __assign({}, gVars);
            //console.log(this.globalVars);
        };
        return Boot;
    }(Phaser.State));
    RabbitRunGame.Boot = Boot;
})(RabbitRunGame || (RabbitRunGame = {}));
//# sourceMappingURL=boot.js.map