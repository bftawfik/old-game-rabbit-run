module RabbitRunGame
{
	interface LooseObject
	{
		[key: string]: any
	}

	export class StartScreen extends Phaser.State
	{
		game: Phaser.Game;
		//ready: Boolean;
		assets: LooseObject;
		globalVars: any;
		tween: LooseObject;


		constructor()
		{
			super();
			//console.log('StartScreen');
		}

		preload()
		{
			this.assets = {};
			this.tween = {};
			this.globalVars = { ...this.game.state.states.Boot.globalVars, sound: { ...this.game.state.states.Boot.globalVars.sound } };
		}

		create()
		{
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
		}

		update()
		{
			//console.log('update');
		}
		//-----------------------------------------------------------------------------------------------
		ssHelpClicked()
		{
			//console.log('ssHelpClicked');
			this.openHelpWindow();
		}

		ssSettingClicked()
		{
			//console.log('ssSettingClicked');
			this.openSettingWindow();
		}

		hpCloseClicked()
		{
			// console.log('hpCloseClicked');
			this.closeHelpWindow();
		}

		spCloseClicked()
		{
			// console.log('hpCloseClicked');
			this.closeSettingWindow();
		}

		spSoundClicked()
		{
			this.globalVars.sound.effects = (this.globalVars.sound.effects + 1) % 2;
			this.assets.sp_Sound_btn.frame = this.globalVars.sound.effects;
			this.game.state.states.Boot.setGlobalVars(this.globalVars);
		}

		spMusicClicked()
		{
			this.globalVars.sound.music = (this.globalVars.sound.music + 1) % 2;
			this.assets.sp_Music_btn.frame = this.globalVars.sound.music;
			this.game.state.states.Boot.setGlobalVars(this.globalVars);
		}

		spResetScoreClicked()
		{
			console.log('spResetScoreClicked');
			this.globalVars.score = 0;
			this.game.state.states.Boot.setGlobalVars(this.globalVars);
		}

		ssPlayClicked()
		{
			//console.log('ssPlayClicked');
			this.game.state.start('LevelsScreen');
		}
		//-----------------------------------------------------------------------------------------------
		openHelpWindow()
		{
			// console.log('createHelpWindow');
			if ((this.tween && this.tween.isRunning) || this.assets.hp_Bg_img.scale.x === 1)
			{
				return;
			} else
			{
				this.tween = this.add.tween(this.assets.hp_Bg_img.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
			}
		}

		closeHelpWindow()
		{
			// console.log('removeHelpWindow');
			if ((this.tween && this.tween.isRunning) || this.assets.hp_Bg_img.scale.x === 0)
			{
				return;
			} else
			{
				this.tween = this.add.tween(this.assets.hp_Bg_img.scale).to({ x: 0, y: 0 }, 500, Phaser.Easing.Elastic.In, true);
			}
		}
		//------------------
		openSettingWindow()
		{
			// console.log('openSettingWindow');
			if ((this.tween && this.tween.isRunning) || this.assets.sp_Bg_img.scale.x === 1)
			{
				return;
			} else
			{
				this.tween = this.add.tween(this.assets.sp_Bg_img.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
			}
		}

		closeSettingWindow()
		{
			// console.log('removeHelpWindow');
			if ((this.tween && this.tween.isRunning) || this.assets.sp_Bg_img.scale.x === 0)
			{
				return;
			} else
			{
				this.tween = this.add.tween(this.assets.sp_Bg_img.scale).to({ x: 0, y: 0 }, 500, Phaser.Easing.Elastic.In, true);
			}
		}
		//-----------------------------------------------------------------------------------------------
		//onLoadComplete()
		//{
		//	console.log('onLoadComplete');
		//	this.ready = true;
		//}

		//loadResources()
		//{
		//	console.log('loadResources');
		//	this.game.load.image('SS_Bg', '/assets/imgs/tempSS/SS_Bg.jpg');
		//	this.game.load.image('SS_Bg0', '/assets/imgs/tempSS/SS_Bg0.jpg');
		//	this.game.load.image('SS_PlayBtn', '/assets/imgs/tempSS/SS_PlayBtn.jpg');
		//	this.game.load.image('SS_HelpBtn', '/assets/imgs/tempSS/SS_HelpBtn.jpg');
		//	this.game.load.image('SS_SettingsBtn', '/assets/imgs/tempSS/SS_SettingsBtn.jpg');

		//	this.game.load.image('HP_Bg', '/assets/imgs/pallets/tempHP/HP_Bg.jpg');
		//	this.game.load.image('HP_Bg0', '/assets/imgs/pallets/tempHP/HP_Bg0.jpg');
		//	this.game.load.image('HP_CloseBtn', '/assets/imgs/pallets/tempHP/HP_CloseBtn.jpg');

		//	this.game.load.image('SP_Bg', '/assets/imgs/pallets/tempSP/SP_Bg.jpg');
		//	this.game.load.image('SP_Bg0', '/assets/imgs/pallets/tempSP/SP_Bg0.jpg');
		//	this.game.load.image('SP_MusicBtn', '/assets/imgs/pallets/tempSP/SP_MusicBtn.jpg');
		//	this.game.load.image('SP_ResetScoreBtn', '/assets/imgs/pallets/tempSP/SP_ResetScoreBtn.jpg');
		//	this.game.load.image('SP_SoundBtn', '/assets/imgs/pallets/tempSP/SP_SoundBtn.jpg');
		//}
	}
}