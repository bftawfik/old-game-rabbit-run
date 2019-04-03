module RabbitRunGame
{
	interface LooseObject
	{
		[key: string]: any
	}

	export class MainPreloader extends Phaser.State
	{
		game: Phaser.Game;
		ready: Boolean;
		assets: LooseObject;

		globalVars: any;

		constructor()
		{
			super();
		}

		preload()
		{
			//console.log('MainPreloader');

			this.assets = {};

			this.globalVars = { ...this.game.state.states.Boot.globalVars, sound: { ...this.game.state.states.Boot.globalVars.sound } };

			this.game.load.onLoadComplete.addOnce(this.onLoadComplete, this);
			this.loadResources();
		}

		create()
		{
			//console.log('create');
			this.assets.preloaderBg_img = this.game.add.sprite(0, 0, 'preloaderBg_img');
			this.assets.preloaderBar0_img = this.game.add.sprite(this.game.world.width * 0.418, this.game.world.height * 0.75, 'preloaderBar0_img');
			this.assets.preloaderBar0_img.anchor.setTo(0, 0.5);
			this.assets.preloaderBar1_img = this.game.add.sprite(this.game.world.width * 0.418, this.game.world.height * 0.75, 'preloaderBar1_img');
			this.assets.preloaderBar1_img.anchor.setTo(0, 0.5);

			this.game.load.setPreloadSprite(this.assets.preloaderBar1_img);

			
		}

		update()
		{
			if (this.ready)
			{
				this.game.state.start('StartScreen');
			}
		}

		onLoadComplete()
		{
			//console.log('onLoadComplete');
			this.ready = true;
		}

		loadResources()
		{
			//console.log('loadResources');
			this.game.load.image('SS_Bg0', './assets/imgs/SS/SS_Bg0.jpg');
			this.game.load.image('SS_PlayBtn', './assets/imgs/SS/SS_PlayBtn.png');
			this.game.load.image('SS_HelpBtn', './assets/imgs/SS/SS_HelpBtn.png');
			this.game.load.image('SS_SettingsBtn', './assets/imgs/SS/SS_SettingsBtn.png');

			this.game.load.image('HP_Bg0', './assets/imgs/pallets/HP/HP_Bg0.png');
			this.game.load.image('HP_CloseBtn', './assets/imgs/pallets/HP/HP_CloseBtn.png');

			this.game.load.image('SP_Bg', './assets/imgs/pallets/tempSP/SP_Bg.jpg');
			this.game.load.image('SP_Bg0', './assets/imgs/pallets/tempSP/SP_Bg0.jpg');
			this.game.load.spritesheet('SP_MusicBtn', './assets/imgs/pallets/tempSP/SP_MusicBtn.jpg', 408, 120);
			this.game.load.spritesheet('SP_SoundBtn', './assets/imgs/pallets/tempSP/SP_SoundBtn.jpg', 408, 120);
			this.game.load.image('SP_ResetScoreBtn', './assets/imgs/pallets/tempSP/SP_ResetScoreBtn.jpg');
			this.game.load.image('SP_CloseBtn', './assets/imgs/pallets/tempSP/SP_CloseBtn.jpg');

			this.load.image('LS_Bg0', './assets/imgs/LS/LS_Bg0.jpg');
			this.load.image('LS_HelpBtn', './assets/imgs/LS/LS_HelpBtn.png');
			this.load.image('LS_SettingsBtn', './assets/imgs/LS/LS_SettingsBtn.png');
			this.load.spritesheet('LS_LevelStars', './assets/imgs/LS/LS_LevelStars.png', 203, 86);
			for (var levelsCount = 1; levelsCount <= this.globalVars.levelsTotalCount; levelsCount++)
			{
				this.load.spritesheet('LS_Level' + levelsCount + 'Btn', './assets/imgs/LS/LS_Level' + levelsCount + 'Btn.png', 173, 172);
			}
		}
	}
}