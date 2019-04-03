module RabbitRunGame
{
	interface LooseObject
	{
		[key: string]: any
	}

	export class LevelsScreen extends Phaser.State
	{
		game: Phaser.Game;
		ready: Boolean;
		assets: LooseObject;
		globalVars: any;
		tween: LooseObject;


		constructor()
		{
			super();
			//console.log('LevelsScreen');
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

			this.assets.ls_Bg0_img = this.game.add.sprite(0, 0, 'LS_Bg0');
			this.assets.ls_Settings_btn = this.add.button(1735, 110, 'LS_SettingsBtn', this.lsSettingClicked, this);
			this.assets.ls_Settings_btn.anchor.setTo(0.5, 1);
			this.assets.ls_Help_btn = this.add.button(1830, 110, 'LS_HelpBtn', this.lsHelpClicked, this);
			this.assets.ls_Help_btn.anchor.setTo(0.5, 1);
			for (var levelsCount = 1; levelsCount <= this.globalVars.levelsTotalCount; levelsCount++)
			{
				var lsLevelBtnX = (levelsCount - 1) % 4;
				var lsLevelBtnY = Math.floor((levelsCount - 1) / 4);
				this.assets['lsLevel_' + levelsCount + '_btn'] = this.add.button(470 + (270 * lsLevelBtnX), 430 + (280 * lsLevelBtnY), 'LS_Level' + levelsCount + 'Btn', this.lsLevelClicked, this);
				if (levelsCount == 1)
				{
					this.assets['lsLevel_' + levelsCount + '_btn'].frame = 1;
				}
				this.assets['lsLevel_' + levelsCount + '_stars_img'] = this.game.add.sprite(-10, -90, 'LS_LevelStars');
				this.assets['lsLevel_' + levelsCount + '_btn'].addChild(this.assets['lsLevel_' + levelsCount + '_stars_img']);
			}
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
		lsHelpClicked()
		{
			//console.log('ssHelpClicked');
			this.openHelpWindow();
		}

		lsSettingClicked()
		{
			//console.log('ssSettingClicked');
			this.openSettingWindow();
		}

		lsLevelClicked(target)
		{
			//console.log('lsLevelClicked');
			//console.log(target);
			if (target.frame != 0)
			{
				//console.log(target.key.slice(target.key.lastIndexOf("l")+1, target.key.lastIndexOf("B")));
				var levelId = target.key.slice(target.key.lastIndexOf("l") + 1, target.key.lastIndexOf("B"));
				//console.log(levelId);
				this.game.state.start('Level'+levelId+'Preloader');
			}
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
			//console.log('spResetScoreClicked');
			this.globalVars.score = 0;
			this.game.state.states.Boot.setGlobalVars(this.globalVars);
		}

		ssPlayClicked()
		{
			//console.log('ssPlayClicked');
			//this.game.state.start('LevelsScreen');
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
	}
}