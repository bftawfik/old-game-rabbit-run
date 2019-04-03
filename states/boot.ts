module RabbitRunGame
{
	export class Boot extends Phaser.State
	{
		game: Phaser.Game;
		ready: Boolean;
		titleScreenImage: Phaser.Sprite;
		globalVars: any;

		constructor()
		{
			super();
			
		}

		//init(customParam1, customParam2)
		//{
		//	this.customParam1 = customParam1;
		//	console.log(customParam1);
		//}

		preload()
		{
			this.updateGameScale();
			//
			this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
			this.loadResources();
		}

		create()
		{
			//console.log('create');
			this.createGameVars();
		}

		update()
		{
			if (this.ready)
			{
				this.game.state.start('MainPreloader');
			}
		}

		updateGameScale()
		{
			
		}

		onLoadComplete()
		{
			//console.log('onLoadComplete');
			this.ready = true;
		}

		loadResources()
		{
			//console.log('loadResources');
			this.game.load.image('preloaderBg_img', './assets/imgs/main/preloaderBg.jpg');
			this.game.load.image('orient_img', './assets/imgs/main/orient.jpg');
			this.game.load.image('preloaderBar0_img', './assets/imgs/main/preloaderBar0.png');
			this.game.load.image('preloaderBar1_img', './assets/imgs/main/preloaderBar1.png');
		}

		checkIfMobilePhone()
		{
			var ua = navigator.userAgent;
			var kindle = new RegExp(/Kindle|Silk|KFTT|KFOT|KFJWA|KFJWI|KFSOWI|KFTHWA|KFTHWI|KFAPWA|KFAPWI/);
			var blackBerry = new RegExp(/BlackBerry|bb|PlayBook/);
			var ios = new RegExp(/iPad|iPhone|iPod/);
			var android = new RegExp(/Android/);
			var rest = new RegExp(/webOS|IEMobile|Opera Mini/);
			var allMobilePhones = new RegExp(kindle.source + "|" + blackBerry.source + "|" + ios.source + "|" + android.source + "|" + rest.source, "i");
			var isMobilePhone = allMobilePhones.test(ua);
			return isMobilePhone;
		}

		createGameVars()
		{
			this.globalVars = {
				mobileDevice: this.checkIfMobilePhone(),
				sound: {
					music: 1,
					effects: 1,
				},
				levelsTotalCount: 8,
				score: 0,
				new: 1
			}
		}

		setGlobalVars(gVars:any)
		{
			this.globalVars = { ...gVars };
			//console.log(this.globalVars);
		}
	}
}