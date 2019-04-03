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
    var Level1Preloader = (function (_super) {
        __extends(Level1Preloader, _super);
        //globalVars: any;
        function Level1Preloader() {
            return _super.call(this) || this;
        }
        Level1Preloader.prototype.preload = function () {
            //console.log('Level1Preloader');
            this.assets = {};
            //this.globalVars = { ...this.game.state.states.Boot.globalVars, sound: { ...this.game.state.states.Boot.globalVars.sound } };
            this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
            this.loadResources();
        };
        Level1Preloader.prototype.create = function () {
            //console.log('create');
            this.assets.preloaderBg_img = this.game.add.sprite(0, 0, 'preloaderBg_img');
            this.assets.preloaderBar0_img = this.game.add.sprite(this.game.world.width * 0.418, this.game.world.height * 0.75, 'preloaderBar0_img');
            this.assets.preloaderBar0_img.anchor.setTo(0, 0.5);
            this.assets.preloaderBar1_img = this.game.add.sprite(this.game.world.width * 0.418, this.game.world.height * 0.75, 'preloaderBar1_img');
            this.assets.preloaderBar1_img.anchor.setTo(0, 0.5);
            this.game.load.setPreloadSprite(this.assets.preloaderBar1_img);
        };
        Level1Preloader.prototype.update = function () {
            if (this.ready) {
                this.game.state.start('Level1Screen');
            }
        };
        Level1Preloader.prototype.onLoadComplete = function () {
            //console.log('onLoadComplete');
            this.ready = true;
        };
        Level1Preloader.prototype.loadResources = function () {
            //console.log('loadResources');
            // load the tiles image
            this.game.load.image('L1_Tiles', './assets/imgs/level1/L1_Tiles.png');
            // load the tiles map
            //this.game.load.tilemap('L1_Map', './assets/maps/L1_Map.json', null, Phaser.Tilemap.TILED_JSON);
            //this.game.load.tilemap('L1_Map', './assets/maps/L1_Map_Aya_10092017_1611/L1_Map_Aya_10092017_1611.json', null, Phaser.Tilemap.TILED_JSON);
            //this.game.load.tilemap('L1_Map', './assets/maps/L1_Map_Aya_15102017_1102/L1_Map_Aya_15102017_1102.json', null, Phaser.Tilemap.TILED_JSON);
            //this.game.load.tilemap('L1_Map', './assets/maps/L1_Map_Aya_23102017_1229/L1_Map_Aya_23102017_1229.json', null, Phaser.Tilemap.TILED_JSON);
            //this.game.load.tilemap('L1_Map', './assets/maps/L1_Map_Aya_23102017_1643/L1_Map_Aya_23102017_1643.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.tilemap('L1_Map', './assets/maps/L1_Map_Bft_22012018_1342/L1_Map_Bft_22012018_1342.json', null, Phaser.Tilemap.TILED_JSON);
            // load the main character image
            this.game.load.spritesheet('ALS_Player', './assets/imgs/allLevels/ALS_Player.png', 65, 108, 6);
            // load the main character bullet image
            this.game.load.image('ALS_Bullet', './assets/imgs/allLevels/ALS_Bullet.png');
            // load the main level background image
            this.game.load.image('L1_Bg', './assets/imgs/level1/level1_bg2.jpg');
            // load the Life Icon
            this.game.load.spritesheet('ALS_Heart_Icon', './assets/imgs/allLevels/ALS_HeartIcon.png', 55, 50, 2);
            // load the Carrot Icon
            this.game.load.image('ALS_Carrot_Icon', './assets/imgs/allLevels/ALS_CarrotIcon.png');
            // load the Coin Icon
            this.game.load.image('ALS_Coin_Icon', './assets/imgs/allLevels/ALS_CoinIcon.png');
            // load the Ruby Icon
            this.game.load.image('ALS_Ruby_Icon', './assets/imgs/allLevels/ALS_RubyIcon.png');
            // load the Coin Sprite
            this.game.load.spritesheet('ALS_Coin_Sprite', './assets/imgs/allLevels/ALS_CoinSprite.png', 55, 50, 6);
            // load the Carrot Sprite
            this.game.load.spritesheet('ALS_Carrot_Sprite', './assets/imgs/allLevels/ALS_CarrotSprite.png', 108, 108, 4);
            // load the Ruby Sprite
            this.game.load.spritesheet('ALS_Ruby_Sprite', './assets/imgs/allLevels/ALS_RubySprite.png', 56, 50, 3);
            // load the Snake Sprite
            this.game.load.spritesheet('L1_Snake_Sprite', './assets/imgs/level1/L1_Snake.png', 75, 108, 2);
            // load the Turtle Sprite
            this.game.load.spritesheet('L1_Turtle_Sprite', './assets/imgs/level1/L1_Turtle.png', 108, 81, 2);
            // load the Door Sprite
            this.game.load.spritesheet('L1_Gate_Sprite', './assets/imgs/level1/L1_Gate.png', 216, 180, 3);
            // load the nayupixelRegular font
            this.game.load.bitmapFont('nayupixelRegular', 'assets/fonts/bitmapFonts/nayupixelRegular/nayupixelRegular.png', 'assets/fonts/bitmapFonts/nayupixelRegular/nayupixelRegular.xml');
            // load the Game Over Pallet
            this.game.load.image('GO_Bg', './assets/imgs/pallets/tempGO/GO_Bg.jpg');
            this.game.load.image('GO_ExitBtn', './assets/imgs/pallets/tempGO/GO_ExitBtn.png');
            this.game.load.image('GO_PlayAgainBtn', './assets/imgs/pallets/tempGO/GO_PlayAgainBtn.png');
        };
        return Level1Preloader;
    }(Phaser.State));
    RabbitRunGame.Level1Preloader = Level1Preloader;
})(RabbitRunGame || (RabbitRunGame = {}));
//# sourceMappingURL=level1Preloader.js.map