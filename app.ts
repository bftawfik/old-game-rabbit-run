module RabbitRunGame
{
	export class RabbitRun
	{
		game: Phaser.Game;

		constructor()
		{
			//this.game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'content', { create: this.create, preload: this.preload });
			this.game = new Phaser.Game(1920, 1080, Phaser.CANVAS , 'content', { create: this.create, preload: this.preload });
			//this.game = new Phaser.Game(1920, 1080, Phaser.WEBGL, 'content', { create: this.create, preload: this.preload });
		}

		preload()
		{
			//console.log('preload');
		}

		create()
		{
			//var customParam1 = 'hi';
			//var customParam2 = 'hi2';
			this.game.state.add('Boot', RabbitRunGame.Boot);
			this.game.state.add('MainPreloader', RabbitRunGame.MainPreloader);
			this.game.state.add('StartScreen', RabbitRunGame.StartScreen);
			this.game.state.add('LevelsScreen', RabbitRunGame.LevelsScreen);
			this.game.state.add('Level1Preloader', RabbitRunGame.Level1Preloader);
			this.game.state.add('Level1Screen', RabbitRunGame.Level1Screen);
			
			//this.game.state.start('Boot', true, false, customParam1, customParam2);
			this.game.state.start('Boot');
			//
			this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.game.scale.windowConstraints.bottom = "visual";
		}

		
	}
}

window.onload = () =>
{
	var game = new RabbitRunGame.RabbitRun();
}