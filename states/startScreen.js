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
    var StartScreen = (function (_super) {
        __extends(StartScreen, _super);
        function StartScreen() {
            return _super.call(this) || this;
            //console.log('StartScreen');
        }
        StartScreen.prototype.preload = function () {
            this.assets = {};
            this.tween = {};
            this.globalVars = __assign({}, this.game.state.states.Boot.globalVars, { sound: __assign({}, this.game.state.states.Boot.globalVars.sound) });
        };
        StartScreen.prototype.create = function () {
            //console.log('create');
            this.assets.ss_Bg0_img = this.game.add.sprite(0, 0, 'SS_Bg0');
            this.assets.ss_Play_btn = this.add.button(630, 810, 'SS_PlayBtn', this.ssPlayClicked, this);
            this.assets.ss_Play_btn.anchor.setTo(0.5, 1);
            this.assets.ss_Settings_btn = this.add.button(505, 955, 'SS_SettingsBtn', this.ssSettingClicked, this);
            this.assets.ss_Settings_btn.anchor.setTo(0.5, 1);
            this.assets.ss_Help_btn = this.add.button(700, 955, 'SS_HelpBtn', this.ssHelpClicked, this);
            this.assets.ss_Help_btn.anchor.setTo(0.5, 1);
            //
            this.assets.hp_Bg_img = this.add.sprite(960, 0, 'HP_Bg0');
            this.assets.hp_Bg_img.anchor.setTo(0.5, 0);
            this.assets.hp_Bg_img.inputEnabled = true;
            this.assets.hp_Bg_img.scale.set(0);
            this.assets.hp_Close_btn = this.add.button(-230, 770, 'HP_CloseBtn', this.hpCloseClicked, this);
            this.assets.hp_Close_btn.anchor.setTo(0, 0);
            this.assets.hp_Bg_img.addChild(this.assets.hp_Close_btn);
            //
            this.assets.sp_Bg_img = this.add.sprite(960, 0, 'SP_Bg0');
            this.assets.sp_Bg_img.anchor.setTo(0.5, 0);
            this.assets.sp_Bg_img.inputEnabled = true;
            this.assets.sp_Bg_img.scale.set(0);
            this.assets.sp_Sound_btn = this.add.button(-250, 500, 'SP_SoundBtn', this.spSoundClicked, this);
            this.assets.sp_Sound_btn.anchor.setTo(0.5, 1);
            this.assets.sp_Sound_btn.frame = this.globalVars.sound.effects;
            this.assets.sp_Bg_img.addChild(this.assets.sp_Sound_btn);
            this.assets.sp_Music_btn = this.add.button(250, 500, 'SP_MusicBtn', this.spMusicClicked, this);
            this.assets.sp_Music_btn.anchor.setTo(0.5, 1);
            this.assets.sp_Music_btn.frame = this.globalVars.sound.music;
            this.assets.sp_Bg_img.addChild(this.assets.sp_Music_btn);
            this.assets.sp_ResetScore_btn = this.add.button(0, 800, 'SP_ResetScoreBtn', this.spResetScoreClicked, this);
            this.assets.sp_ResetScore_btn.anchor.setTo(0.5, 1);
            this.assets.sp_Bg_img.addChild(this.assets.sp_ResetScore_btn);
            this.assets.sp_Close_btn = this.add.button(0, 950, 'SP_CloseBtn', this.spCloseClicked, this);
            this.assets.sp_Close_btn.anchor.setTo(0.5, 1);
            this.assets.sp_Bg_img.addChild(this.assets.sp_Close_btn);
        };
        StartScreen.prototype.update = function () {
            //console.log('update');
        };
        //-----------------------------------------------------------------------------------------------
        StartScreen.prototype.ssHelpClicked = function () {
            //console.log('ssHelpClicked');
            this.openHelpWindow();
        };
        StartScreen.prototype.ssSettingClicked = function () {
            //console.log('ssSettingClicked');
            this.openSettingWindow();
        };
        StartScreen.prototype.hpCloseClicked = function () {
            // console.log('hpCloseClicked');
            this.closeHelpWindow();
        };
        StartScreen.prototype.spCloseClicked = function () {
            // console.log('hpCloseClicked');
            this.closeSettingWindow();
        };
        StartScreen.prototype.spSoundClicked = function () {
            this.globalVars.sound.effects = (this.globalVars.sound.effects + 1) % 2;
            this.assets.sp_Sound_btn.frame = this.globalVars.sound.effects;
            this.game.state.states.Boot.setGlobalVars(this.globalVars);
        };
        StartScreen.prototype.spMusicClicked = function () {
            this.globalVars.sound.music = (this.globalVars.sound.music + 1) % 2;
            this.assets.sp_Music_btn.frame = this.globalVars.sound.music;
            this.game.state.states.Boot.setGlobalVars(this.globalVars);
        };
        StartScreen.prototype.spResetScoreClicked = function () {
            console.log('spResetScoreClicked');
            this.globalVars.score = 0;
            this.game.state.states.Boot.setGlobalVars(this.globalVars);
        };
        StartScreen.prototype.ssPlayClicked = function () {
            //console.log('ssPlayClicked');
            this.game.state.start('LevelsScreen');
        };
        //-----------------------------------------------------------------------------------------------
        StartScreen.prototype.openHelpWindow = function () {
            // console.log('createHelpWindow');
            if ((this.tween && this.tween.isRunning) || this.assets.hp_Bg_img.scale.x === 1) {
                return;
            }
            else {
                this.tween = this.add.tween(this.assets.hp_Bg_img.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
            }
        };
        StartScreen.prototype.closeHelpWindow = function () {
            // console.log('removeHelpWindow');
            if ((this.tween && this.tween.isRunning) || this.assets.hp_Bg_img.scale.x === 0) {
                return;
            }
            else {
                this.tween = this.add.tween(this.assets.hp_Bg_img.scale).to({ x: 0, y: 0 }, 500, Phaser.Easing.Elastic.In, true);
            }
        };
        //------------------
        StartScreen.prototype.openSettingWindow = function () {
            // console.log('openSettingWindow');
            if ((this.tween && this.tween.isRunning) || this.assets.sp_Bg_img.scale.x === 1) {
                return;
            }
            else {
                this.tween = this.add.tween(this.assets.sp_Bg_img.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
            }
        };
        StartScreen.prototype.closeSettingWindow = function () {
            // console.log('removeHelpWindow');
            if ((this.tween && this.tween.isRunning) || this.assets.sp_Bg_img.scale.x === 0) {
                return;
            }
            else {
                this.tween = this.add.tween(this.assets.sp_Bg_img.scale).to({ x: 0, y: 0 }, 500, Phaser.Easing.Elastic.In, true);
            }
        };
        return StartScreen;
    }(Phaser.State));
    RabbitRunGame.StartScreen = StartScreen;
})(RabbitRunGame || (RabbitRunGame = {}));
//# sourceMappingURL=startScreen.js.map