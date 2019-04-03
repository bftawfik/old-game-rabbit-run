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
var RabbitRunGame;
(function (RabbitRunGame) {
    var StartScreen = (function (_super) {
        __extends(StartScreen, _super);
        function StartScreen() {
            return _super.call(this) || this;
            //console.log('StartScreen');
        }
        StartScreen.prototype.preload = function () {
            this.assets = {};
            this.tween = {};
            this.assets.ss_Bg_img = this.game.add.sprite(0, 0, 'SS_Bg');
            //this.assets.ss_Bg0_img = this.game.add.sprite(0, 0, 'SS_Bg0');
            //----------------------------------------------------------------------------------
            //this.assets.lsBg_0_img = this.add.sprite(0, 0, 'lsBg_0_img');
            ////
            //this.assets.lsSetting_0_btn = this.add.button(1850, 50, 'lsSetting_0_btn', this.lsSettingClicked, this);
            //this.assets.lsSetting_0_btn.anchor.setTo(0.5, 1);
            ////
            //this.assets.lsHelp_0_btn = this.add.button(1750, 50, 'lsHelp_0_btn', this.lsHelpClicked, this);
            //this.assets.lsHelp_0_btn.anchor.setTo(0.5, 1);
            ////this.game.global.levelsTotalCount
            //for (var levelCount = 1; levelCount <= this.game.global.levelsTotalCount; levelCount++)
            //{
            //	var lsLevelBtnX = (levelCount - 1) % 4;
            //	var lsLevelBtnY = Math.floor((levelCount - 1) / 4);
            //	this.assets['lsLevel_' + levelCount + '_btn'] = this.add.button(350 + (350 * lsLevelBtnX), 400 + (300 * lsLevelBtnY), 'lsLevel_' + levelCount + '_btn', this.lsLevelClicked, this);
            //	if (levelCount == 1)
            //	{
            //		this.assets['lsLevel_' + levelCount + '_btn'].frame = 1;
            //	}
            //}
            ////---------------
            //this.assets.lsHelpBg_0_img = this.add.sprite(850, 20, 'ssHelpBg_0_img');
            //this.assets.lsHelpBg_0_img.anchor.setTo(0.5, 0);
            //this.assets.lsHelpBg_0_img.inputEnabled = true;
            //this.assets.lsHelpBg_0_img.scale.set(0);
            ////
            //this.assets.lsHelpClose_0_btn = this.add.button(0, 950, 'ssHelpClose_0_btn', this.lsHelpCloseClicked, this);
            //this.assets.lsHelpClose_0_btn.anchor.setTo(0.5, 1);
            //this.assets.lsHelpBg_0_img.addChild(this.assets.lsHelpClose_0_btn);
            ////---------------
            //this.assets.lsSettingBg_0_img = this.add.sprite(850, 20, 'ssSettingBg_0_img');
            //this.assets.lsSettingBg_0_img.anchor.setTo(0.5, 0);
            //this.assets.lsSettingBg_0_img.inputEnabled = true;
            //this.assets.lsSettingBg_0_img.scale.set(0);
            ////
            //this.assets.lsSettingSound_0_btn = this.add.button(-250, 500, 'ssSettingSound_0_btn', this.lsSettingSoundClicked, this);
            //this.assets.lsSettingSound_0_btn.anchor.setTo(0.5, 1);
            //this.assets.lsSettingSound_0_btn.frame = this.game.global.sound.effects;
            //this.assets.lsSettingBg_0_img.addChild(this.assets.lsSettingSound_0_btn);
            ////
            //this.assets.lsSettingMusic_0_btn = this.add.button(250, 500, 'ssSettingMusic_0_btn', this.lsSettingMusicClicked, this);
            //this.assets.lsSettingMusic_0_btn.anchor.setTo(0.5, 1);
            //this.assets.lsSettingMusic_0_btn.frame = this.game.global.sound.music;
            //this.assets.lsSettingBg_0_img.addChild(this.assets.lsSettingMusic_0_btn);
            ////
            //this.assets.lsSettingResetScore_0_btn = this.add.button(0, 800, 'ssSettingResetScore_0_btn', this.lsSettingResetScoreClicked, this);
            //this.assets.lsSettingResetScore_0_btn.anchor.setTo(0.5, 1);
            //this.assets.lsSettingBg_0_img.addChild(this.assets.lsSettingResetScore_0_btn);
            //// //
            //this.assets.lsSettingClose_0_btn = this.add.button(0, 950, 'ssSettingClose_0_btn', this.lsSettingCloseClicked, this);
            //this.assets.lsSettingClose_0_btn.anchor.setTo(0.5, 1);
            //this.assets.lsSettingBg_0_img.addChild(this.assets.lsSettingClose_0_btn);
            // console.log(this.game.global);
            //----------------------------------------------------------------------------------
            //this.assets.preloaderBg_img = this.add.sprite(0, 0, 'SS_Bg');
            //this.assets.preloaderBar0_img = this.add.sprite(this.game.world.width * 0.418, this.game.world.height * 0.75, 'preloaderBar0_img');
            //this.assets.preloaderBar0_img.anchor.setTo(0, 0.5);
            //this.assets.preloaderBar1_img = this.add.sprite(this.game.world.width * 0.418, this.game.world.height * 0.75, 'preloaderBar1_img');
            //this.assets.preloaderBar1_img.anchor.setTo(0, 0.5);
            //this.game.load.setPreloadSprite(this.assets.preloaderBar1_img);
            //this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
            //this.loadResources();
        };
        StartScreen.prototype.create = function () {
            //console.log('create');
        };
        StartScreen.prototype.update = function () {
            //if (this.ready)
            //{
            //	this.game.state.start('mainPreloader');
            //}
        };
        return StartScreen;
    }(Phaser.State));
    RabbitRunGame.StartScreen = StartScreen;
})(RabbitRunGame || (RabbitRunGame = {}));
//# sourceMappingURL=mainScreen.js.map