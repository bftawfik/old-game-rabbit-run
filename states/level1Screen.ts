module RabbitRunGame
{
	interface LooseObject
	{
		[key: string]: any
	}
	export class Level1Screen extends Phaser.State
	{
		game: Phaser.Game;
		assets: LooseObject;
		globalVars: any;
		localVars: any;
		tween: LooseObject;

		constructor()
		{
			super();
			//console.log('Level1Screen');
		}

		preload()
		{
			this.assets = {};
			this.tween = {};
			this.globalVars = { ...this.game.state.states.Boot.globalVars, sound: { ...this.game.state.states.Boot.globalVars.sound } };
			this.localVars = {
				totalLifesCount: RabbitRunGame.Constants.GAME_LEVEL1.LIFES_COUNT,
				l1_Player: {
					speed: RabbitRunGame.Constants.GAME_LEVEL1.PLAYER_SPEED,
					lastJumpAt: 0,
					shootTime: 0,
					lifesCount: RabbitRunGame.Constants.GAME_LEVEL1.LIFES_COUNT,
					carrotsCount: 0,
					coinsCount: 0,
					rubiesCount: 0,
					waitingForKill: false,
					jump: {
						count: 0,
						type: 'undefined',
						lastJumpAt: 0
					},
					inputKeys: {
						upKey: this.game.input.keyboard.addKey(Phaser.Keyboard.UP),
						spacebarKey: this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
					}
				},
				l1_Snakes:{
					speed: RabbitRunGame.Constants.GAME_LEVEL1.SNAKES_SPEED,
					position: <LooseObject>{},
				},
				l1_Turtles: {
					speed: RabbitRunGame.Constants.GAME_LEVEL1.TURTLES_SPEED,
					position: <LooseObject>{},
				},
			};
		}

		createNewBullet()
		{
			if (!this.assets.l1_Bullets_Group)
			{
				this.assets.l1_Bullets_Group = this.game.add.group();
				this.assets.l1_Bullets_Group.enableBody = true;
				this.assets.l1_Bullets_Group.physicsBodyType = Phaser.Physics.ARCADE;
			}
			var tempBullet = this.assets.l1_Bullets_Group.create(this.assets.l1_Player.x + (50 * this.assets.l1_Player.scale.x), this.assets.l1_Player.y - 50, 'ALS_Bullet');
			tempBullet.body.velocity.x = this.assets.l1_Player.body.velocity.x * 3;
			tempBullet.scale.x = this.assets.l1_Player.scale.x;
		}

		create()
		{
			//console.log('create');
			this.game.time.advancedTiming = true;
			//
			// add the Game Graphics ----------------------------------------------------------
			//
			// add the game Background
			this.assets.l1_Bg0_img = this.game.add.sprite(0, 0, 'L1_Bg');
			this.assets.l1_Bg1_img = this.game.add.sprite(this.assets.l1_Bg0_img.width, 0, 'L1_Bg');
			// add the game Map
			this.assets.l1_Map = this.game.add.tilemap('L1_Map');
			this.assets.l1_Map.addTilesetImage('L1_Tiles', 'L1_Tiles');
			this.assets.l1_Map.setCollision([1, 2, 3, 4, 7, 8]);
			this.assets.l1_Map.setTileIndexCallback(RabbitRunGame.Constants.GAME_LEVEL1.FRAMES_WATER, this.hitWater, this);
			//this.assets.l1_Map.setTileIndexCallback(28, this.resetPlayer, this);
			this.assets.l1_Map_Layer1 = this.assets.l1_Map.createLayer("L1_Layer1");
			this.assets.l1_Map_Layer1.resizeWorld();
			// add Coins Group
			this.assets.l1_Coins_Group = this.game.add.group();
			// add the Coins Group Physics
			this.assets.l1_Coins_Group.enableBody = true;
			this.assets.l1_Coins_Group.physicsBodyType = Phaser.Physics.ARCADE;
			// fill the Coins Group
			this.assets.l1_Map.createFromObjects('L1_ObjLayer_Coins', RabbitRunGame.Constants.GAME_LEVEL1.FRAME_COIN, 'ALS_Coin_Sprite', 0, true, false, this.assets.l1_Coins_Group);
			this.assets.l1_Coins_Group.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
			this.assets.l1_Coins_Group.callAll('animations.play', 'animations', 'spin');
			// add Rubies Group
			this.assets.l1_Rubies_Group = this.game.add.group();
			// add the Rubies Group Physics
			this.assets.l1_Rubies_Group.enableBody = true;
			this.assets.l1_Rubies_Group.physicsBodyType = Phaser.Physics.ARCADE;
			// fill the Rubies Group
			this.assets.l1_Map.createFromObjects('L1_ObjLayer_Rubies', RabbitRunGame.Constants.GAME_LEVEL1.FRAME_RUBY, 'ALS_Ruby_Sprite', 0, true, false, this.assets.l1_Rubies_Group);
			this.assets.l1_Rubies_Group.callAll('animations.add', 'animations', 'spin', [0, 1, 2], 10, true);
			this.assets.l1_Rubies_Group.callAll('animations.play', 'animations', 'spin');
			// add Carrots Group
			this.assets.l1_Carrots_Group = this.game.add.group();
			// add the Carrots Group Physics
			this.assets.l1_Carrots_Group.enableBody = true;
			this.assets.l1_Carrots_Group.physicsBodyType = Phaser.Physics.ARCADE;
			// fill the Carrots Group
			this.assets.l1_Map.createFromObjects('L1_ObjLayer_Carrots', RabbitRunGame.Constants.GAME_LEVEL1.FRAME_CARROT, 'ALS_Carrot_Sprite', 0, true, false, this.assets.l1_Carrots_Group);
			this.assets.l1_Carrots_Group.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3], 10, true);
			this.assets.l1_Carrots_Group.callAll('animations.play', 'animations', 'spin');
			// add Snakes Group
			this.assets.l1_Snakes_Group = this.game.add.group();
			// add the Snakes Group Physics
			this.assets.l1_Snakes_Group.enableBody = true;
			this.assets.l1_Snakes_Group.physicsBodyType = Phaser.Physics.ARCADE;
			// fill the Snakes Group
			this.assets.l1_Map.createFromObjects('L1_ObjLayer_Snakes', RabbitRunGame.Constants.GAME_LEVEL1.FRAME_SNAKE, 'L1_Snake_Sprite', 0, true, false, this.assets.l1_Snakes_Group);
			//console.log(this.assets.l1_Snakes_Group.children);
			for (var snakesCount = 0; snakesCount < this.assets.l1_Snakes_Group.children.length; snakesCount++)
			{
				var tempObj = {
					x: this.assets.l1_Snakes_Group.children[snakesCount].position.x,
					y: this.assets.l1_Snakes_Group.children[snakesCount].position.y,
				}
				//console.log(snakesCount, this.assets.l1_Snakes_Group.children[snakesCount].renderOrderID);
				//console.log(String(this.assets.l1_Snakes_Group.children[snakesCount].renderOrderID));
				this.localVars.l1_Snakes.position[String(snakesCount)] = tempObj;
			}
			//console.log(this.localVars.l1_Snakes.position)
			this.assets.l1_Snakes_Group.callAll('animations.add', 'animations', 'spin', [0, 1], 5, true);
			this.assets.l1_Snakes_Group.callAll('animations.play', 'animations', 'spin');
			//console.log(this.assets.l1_Snakes_Group);
			// add Turtles Group
			this.assets.l1_Turtles_Group = this.game.add.group();
			// add the Turtles Group Physics
			this.assets.l1_Turtles_Group.enableBody = true;
			this.assets.l1_Turtles_Group.physicsBodyType = Phaser.Physics.ARCADE;
			// fill the Turtles Group
			this.assets.l1_Map.createFromObjects('L1_ObjLayer_Turtles', RabbitRunGame.Constants.GAME_LEVEL1.FRAME_TURTLE, 'L1_Turtle_Sprite', 0, true, false, this.assets.l1_Turtles_Group);
			this.assets.l1_Turtles_Group.callAll('animations.add', 'animations', 'spin', [0, 1], 5, true);
			this.assets.l1_Turtles_Group.callAll('animations.play', 'animations', 'spin');
			//console.log(this.assets.l1_Turtles_Group);
			for (var turtlesCount = 0; turtlesCount < this.assets.l1_Turtles_Group.children.length; turtlesCount++)
			{
				var tempObj = {
					x: this.assets.l1_Turtles_Group.children[turtlesCount].position.x,
					y: this.assets.l1_Turtles_Group.children[turtlesCount].position.y,
				}
				//console.log(turtlesCount, this.assets.l1_Turtles_Group.children[turtlesCount].renderOrderID);
				//console.log(String(this.assets.l1_Turtles_Group.children[turtlesCount].renderOrderID));
				this.localVars.l1_Turtles.position[String(turtlesCount)] = tempObj;
			}
			// add Gate Group
			this.assets.l1_Gate_Group = this.game.add.group();
			// add the Gate Group Physics
			this.assets.l1_Gate_Group.enableBody = true;
			this.assets.l1_Gate_Group.physicsBodyType = Phaser.Physics.ARCADE;
			// fill the Gate Group
			this.assets.l1_Map.createFromObjects('L1_ObjLayer_Gate', RabbitRunGame.Constants.GAME_LEVEL1.FRAME_GATE, 'L1_Gate_Sprite', 0, true, false, this.assets.l1_Gate_Group);
			this.assets.l1_Gate_Group.callAll('animations.add', 'animations', 'open', [0, 1, 2, 1, 0], 5, false);
			// add the game player
			this.assets.l1_Player = this.game.add.sprite(RabbitRunGame.Constants.GAME_LEVEL1.PLAYER_START_X, RabbitRunGame.Constants.GAME_LEVEL1.PLAYER_START_Y, 'ALS_Player');
			this.assets.l1_Player.anchor.setTo(0.5, 1);
			this.assets.l1_Player.animations.add('idle', [0], 1, true);
			this.assets.l1_Player.animations.add('walk', [1, 2], 7, true);
			this.assets.l1_Player.animations.add('jump', [0], 1, true);
			this.assets.l1_Player.animations.add('shoot', [3], 1, true);
			this.assets.l1_Player.animations.add('dance', [4, 5], 7, true);
			this.assets.l1_Player.animations.play('idle');
			// add the game player winning
			this.assets.l1_Player_Winning = this.game.add.sprite(RabbitRunGame.Constants.GAME_LEVEL1.PLAYER_START_X, RabbitRunGame.Constants.GAME_LEVEL1.PLAYER_START_Y, 'ALS_Player');
			this.assets.l1_Player_Winning.anchor.setTo(0.5, 1);
			this.assets.l1_Player_Winning.animations.add('idle', [0], 1, true);
			this.assets.l1_Player_Winning.animations.add('walk', [1, 2], 7, true);
			this.assets.l1_Player_Winning.animations.add('jump', [0], 1, true);
			this.assets.l1_Player_Winning.animations.add('shoot', [3], 1, true);
			this.assets.l1_Player_Winning.animations.add('dance', [4, 5], 7, true);
			this.assets.l1_Player_Winning.animations.play('idle');
			this.assets.l1_Player_Winning.alpha = 0;
			// add the game Bullets Group
			this.assets.l1_Bullets_Group = this.game.add.group();
			this.assets.l1_Bullets_Group.enableBody = true;
			this.assets.l1_Bullets_Group.physicsBodyType = Phaser.Physics.ARCADE;
			// add life icons UI
			this.assets.l1_Lifes_Icon = [];
			for (var lifesCount = 0; lifesCount < this.localVars.totalLifesCount; lifesCount++)
			{
				this.assets.l1_Lifes_Icon[lifesCount] = this.game.add.sprite(40 + (80 * lifesCount), 40, 'ALS_Heart_Icon');
				this.assets.l1_Lifes_Icon[lifesCount].fixedToCamera = true;
				if (lifesCount > this.localVars.l1_Player.lifesCount)
				{
					this.assets.l1_Lifes_Icon[lifesCount].frame = 1;
				}

			}
			// add carrot Icon UI
			this.assets.l1_Carrot_Icon = this.game.add.sprite(40, 100, 'ALS_Carrot_Icon');
			this.assets.l1_Carrot_Icon.fixedToCamera = true;
			// add carrot Text UI
			this.assets.l1_Carrot_Txt = this.game.add.bitmapText(110, 100, 'nayupixelRegular', 'X ' + String(this.localVars.l1_Player.carrotsCount), 50);
			this.assets.l1_Carrot_Txt.fixedToCamera = true;
			// add coin Icon UI
			this.assets.l1_Coin_Icon = this.game.add.sprite(40, 160, 'ALS_Coin_Icon');
			this.assets.l1_Coin_Icon.fixedToCamera = true;
			// add coin Text UI
			this.assets.l1_Coin_Txt = this.game.add.bitmapText(110, 160, 'nayupixelRegular', 'X ' + String(this.localVars.l1_Player.coinsCount), 50);
			this.assets.l1_Coin_Txt.fixedToCamera = true;
			// add ruby Icon UI
			this.assets.l1_Ruby_Icon = this.game.add.sprite(40, 220, 'ALS_Ruby_Icon');
			this.assets.l1_Ruby_Icon.fixedToCamera = true;
			// add ruby Text UI
			this.assets.l1_Ruby_Txt = this.game.add.bitmapText(110, 220, 'nayupixelRegular', 'X ' + String(this.localVars.l1_Player.rubiesCount), 50);
			this.assets.l1_Ruby_Txt.fixedToCamera = true;
			//
			// add the Game Physics ----------------------------------------------------------
			//
			// add the Game Physics type
			this.game.physics.startSystem(Phaser.Physics.ARCADE);
			// add the Player Physics
			this.game.physics.arcade.enable(this.assets.l1_Player);
			this.assets.l1_Player.body.collideWorldBounds = true;
			// add the Snakes gravity and velocity
			this.assets.l1_Snakes_Group.forEach(function (snake)
			{
				snake.body.collideWorldBounds = true;
				snake.anchor.setTo(0.5, 1);
				snake.body.gravity.y = RabbitRunGame.Constants.GAME_ALL_LEVELS.GRAVITY_Y;
				snake.body.velocity.x = this.localVars.l1_Snakes.speed;
			}.bind(this));
			// add the Turtles gravity and velocity
			this.assets.l1_Turtles_Group.forEach(function (turtle)
			{
				turtle.body.collideWorldBounds = true;
				turtle.anchor.setTo(0.5, 1);
				turtle.body.gravity.y = RabbitRunGame.Constants.GAME_ALL_LEVELS.GRAVITY_Y;
				//turtle.body.velocity.x = this.localVars.l1_Turtles.speed;
			}.bind(this));
			// this lines is just for recored
			//this.assets.l1_Snakes_Group.setAll('body.gravity.y', RabbitRunGame.Constants.GAME_ALL_LEVELS.GRAVITY_Y);
			//this.assets.l1_Snakes_Group.setAll('body.velocity.x', this.localVars.l1_Snakes.speed);

			// add the player gravity
			this.assets.l1_Player.body.gravity.y = RabbitRunGame.Constants.GAME_ALL_LEVELS.GRAVITY_Y;
			// get the camera to follow the player
			this.game.camera.follow(this.assets.l1_Player);
			// add the player x speed
			this.assets.l1_Player.body.velocity.x = this.localVars.l1_Player.speed;
			//
			// add the Game Events ----------------------------------------------------------
			//
			// add the Game Events
			this.addGameEvents();
			//-----
			this.assets.go_Bg_img = this.add.sprite(850, 220, 'GO_Bg');
			this.assets.go_Bg_img.anchor.setTo(0.5, 0);
			this.assets.go_Bg_img.inputEnabled = true;
			this.assets.go_Bg_img.fixedToCamera = true;
			this.assets.go_Bg_img.scale.set(0);
			//
			this.assets.go_Life_Txt = this.game.add.bitmapText(-200, 145, 'nayupixelRegular', 'X ' + String(this.localVars.l1_Player.lifesCount * RabbitRunGame.Constants.GAME_LEVEL1.LIFE_SCORE), 60);
			this.assets.go_Life_Txt.anchor.setTo(0, 0);
			this.assets.go_Bg_img.addChild(this.assets.go_Life_Txt);
			//
			this.assets.go_Carrot_Txt = this.game.add.bitmapText(-200, 225, 'nayupixelRegular', 'X ' + String(this.localVars.l1_Player.carrotsCount * RabbitRunGame.Constants.GAME_LEVEL1.CARROT_SCORE), 60);
			this.assets.go_Carrot_Txt.anchor.setTo(0, 0);
			this.assets.go_Bg_img.addChild(this.assets.go_Carrot_Txt);
			//
			this.assets.go_Coin_Txt = this.game.add.bitmapText(80, 145, 'nayupixelRegular', 'X ' + String(this.localVars.l1_Player.coinsCount * RabbitRunGame.Constants.GAME_LEVEL1.COIN_SCORE), 60);
			this.assets.go_Coin_Txt.anchor.setTo(0, 0);
			this.assets.go_Bg_img.addChild(this.assets.go_Coin_Txt);
			//
			this.assets.go_Time_Txt = this.game.add.bitmapText(80, 225, 'nayupixelRegular', 'X ' + String(RabbitRunGame.Constants.GAME_LEVEL1.TOTAL_LEVEL_TIME_SCORE - (this.localVars.l1_Player.carrotsCount * RabbitRunGame.Constants.GAME_LEVEL1.SUBTRACT_TIME_SCORE)), 60);
			this.assets.go_Time_Txt.anchor.setTo(0, 0);
			this.assets.go_Bg_img.addChild(this.assets.go_Time_Txt);
			//
			this.assets.go_Total_Score_Txt = this.game.add.bitmapText(
				30, 320, 'nayupixelRegular',
				'X ' + String(
					(this.localVars.l1_Player.lifesCount * RabbitRunGame.Constants.GAME_LEVEL1.LIFE_SCORE) +
					(this.localVars.l1_Player.carrotsCount * RabbitRunGame.Constants.GAME_LEVEL1.CARROT_SCORE) +
					(this.localVars.l1_Player.coinsCount * RabbitRunGame.Constants.GAME_LEVEL1.COIN_SCORE) +
					(RabbitRunGame.Constants.GAME_LEVEL1.TOTAL_LEVEL_TIME_SCORE - (this.localVars.l1_Player.carrotsCount * RabbitRunGame.Constants.GAME_LEVEL1.SUBTRACT_TIME_SCORE))
				),
				60
			);
			this.assets.go_Total_Score_Txt.anchor.setTo(0, 0);
			this.assets.go_Bg_img.addChild(this.assets.go_Total_Score_Txt);
			//
			this.assets.go_Exit_btn = this.add.button(-50, 450, 'GO_ExitBtn', this.goExitClicked, this);
			this.assets.go_Exit_btn.anchor.setTo(1, 1);
			this.assets.go_Bg_img.addChild(this.assets.go_Exit_btn);
			//
			this.assets.go_PlayAgain_btn = this.add.button(50, 450, 'GO_PlayAgainBtn', this.goPlayAgainClicked, this);
			this.assets.go_PlayAgain_btn.anchor.setTo(0, 1);
			this.assets.go_Bg_img.addChild(this.assets.go_PlayAgain_btn);
			//
		}
		updateLifeCount()
		{
			// check for lifes left count
			for (var lifesCount = 0; lifesCount < this.localVars.totalLifesCount; lifesCount++)
			{
				//console.log(lifesCount , this.localVars.l1_Player.lifesCount)
				if (lifesCount >= this.localVars.l1_Player.lifesCount)
				{
					this.assets.l1_Lifes_Icon[lifesCount].frame = 1;
				}
				else
				{
					this.assets.l1_Lifes_Icon[lifesCount].frame = 0;
				}
			}
		}

		update()
		{
			// check for player collide with the map
			this.game.physics.arcade.collide(this.assets.l1_Player, this.assets.l1_Map_Layer1);
			// check for player collide with the map
			this.game.physics.arcade.collide(this.assets.l1_Snakes_Group, this.assets.l1_Map_Layer1);
			// check for player collide with the map
			this.game.physics.arcade.collide(this.assets.l1_Turtles_Group, this.assets.l1_Map_Layer1);
			// change the player state when jump or walk
			if (this.localVars.l1_Player.waitingForKill == false)
			{
				if (this.assets.l1_Player.animations.currentAnim.name !== "shoot")
				{
					if (this.assets.l1_Player.body.blocked.down == true)
					{
						this.assets.l1_Player.animations.play('walk');
					} else
					{
						this.assets.l1_Player.animations.play('jump');
					}
				}
			}
			// turn the player the other side when hit left or right
			if (this.assets.l1_Player.body.velocity.x==0 && this.assets.l1_Player.body.enable==true)
			{
				this.localVars.l1_Player.speed *= -1;
				this.assets.l1_Player.body.velocity.x = this.localVars.l1_Player.speed;
				this.assets.l1_Player.scale.x *= -1;
			}
			// turn the sankes the other side when hit left or right
			this.assets.l1_Snakes_Group.forEach(function (snake)
			{
				if (snake.inCamera)
				{
					if (snake.body.blocked.right || snake.body.blocked.left)
					{
						this.localVars.l1_Snakes.speed *= -1;
						snake.scale.x *= -1;
					} else
					{
						snake.body.velocity.x = this.localVars.l1_Snakes.speed;
					}
				} else
				{
					snake.body.velocity.x = 0;
				}
			}.bind(this));
			// turn the turtles the other side when hit left or right
			this.assets.l1_Turtles_Group.forEach(function (turtle)
			{
				if (turtle.inCamera)
				{
					if (turtle.body.blocked.right || turtle.body.blocked.left)
					{
						this.localVars.l1_Turtles.speed *= -1;
						turtle.scale.x *= -1;
					} else{
						turtle.body.velocity.x = this.localVars.l1_Turtles.speed;
					}
				} else
				{
					turtle.body.velocity.x = 0;
				}
			}.bind(this));
			//
			if (this.assets.l1_Bullets_Group)
			{
				this.assets.l1_Bullets_Group.forEach(function (bullet)
				{
					if (bullet.x < this.game.camera.x || bullet.x > (this.game.camera.x + this.game.camera.width))
					{
						console.log('out');
						this.assets.l1_Bullets_Group.remove(bullet);
					}
				}.bind(this));
			}
			// animate the background
			var bgOutOfScreen = Math.floor((this.game.camera.x * (1 - RabbitRunGame.Constants.GAME_LEVEL1.BACKGROUND_SPEED)) / this.assets.l1_Bg0_img.width);
			this.assets.l1_Bg0_img.x = (bgOutOfScreen * this.assets.l1_Bg0_img.width) + (this.game.camera.x * RabbitRunGame.Constants.GAME_LEVEL1.BACKGROUND_SPEED);
			this.assets.l1_Bg1_img.x = this.assets.l1_Bg0_img.width + this.assets.l1_Bg0_img.x;
			//
			//console.log(this.assets.l1_Coins_Group);
			this.game.physics.arcade.overlap(this.assets.l1_Coins_Group, this.assets.l1_Player, this.collectCoins.bind(this), null, this);
			this.game.physics.arcade.overlap(this.assets.l1_Rubies_Group, this.assets.l1_Player, this.collectRubies.bind(this), null, this);
			this.game.physics.arcade.overlap(this.assets.l1_Carrots_Group, this.assets.l1_Player, this.collectCarrots.bind(this), null, this);
			this.game.physics.arcade.overlap(this.assets.l1_Snakes_Group, this.assets.l1_Player, this.hitSnakes.bind(this), null, this);
			this.game.physics.arcade.overlap(this.assets.l1_Turtles_Group, this.assets.l1_Player, this.hitTurtles.bind(this), null, this);
			this.game.physics.arcade.overlap(this.assets.l1_Bullets_Group, this.assets.l1_Snakes_Group, this.killSnake.bind(this), null, this);
			this.game.physics.arcade.overlap(this.assets.l1_Bullets_Group, this.assets.l1_Turtles_Group, this.killTurtle.bind(this), null, this);
			this.game.physics.arcade.overlap(this.assets.l1_Gate_Group, this.assets.l1_Player, this.hitGate.bind(this), null, this);
			//

		}

		render()
		{
			this.game.debug.text(String(this.game.time.fps), 2, 34, "#00ff00", "60px Arial");
		}

		//-----------------------------------------------------------------------------------------------

		addGameEvents()
		{
			//console.log('addGameEvents');
			//this.localVars.l1_Player
			if (this.globalVars.mobileDevice)
			{
				this.game.input.onDown.add(this.touchDown, this);
			} else
			{
				this.localVars.l1_Player.inputKeys.upKey.onDown.add(this.upPressed, this);
				this.localVars.l1_Player.inputKeys.spacebarKey.onDown.add(this.spacebarPressed, this);
			}
		}

		touchDown()
		{
			var tempPosition = this.game.input.pointer1.x / RabbitRunGame.Constants.GAME_ALL_LEVELS.MAX_GAME_WIDTH * 2;
			if (tempPosition < 1)
			{
				this.shootFire();
			} else
			{
				// console.log('Jump');
				this.jumpStart();
			}
		}

		upPressed()
		{
			// console.log('Jump');
			this.jumpStart();
		}

		spacebarPressed()
		{
			this.shootFire();
		}

		jumpStart()
		{
			//console.log('jumpStart');
			if (this.assets.l1_Player.body.blocked.down == true)
			{
				this.assets.l1_Player.body.velocity.y = RabbitRunGame.Constants.GAME_LEVEL1.PLAYER_JUMP_HEIGHT;
				this.localVars.l1_Player.jump.lastJumpAt = this.time.now;
				this.localVars.l1_Player.jump.type = 'jump';
			} else
			{
				//console.log(this.localVars.l1_Player.jump.lastJumpAt);
				var dTime = this.game.time.now - this.localVars.l1_Player.jump.lastJumpAt;
				if (dTime < RabbitRunGame.Constants.GAME_LEVEL1.JUMP_TIME_MARGIN && this.localVars.l1_Player.jump.type == 'jump')
				{
					this.assets.l1_Player.body.velocity.y += RabbitRunGame.Constants.GAME_LEVEL1.PLAYER_DOUBLE_JUMP_HEIGHT;
					this.localVars.l1_Player.jump.type = 'doubleJump';
				}
			}
		}

		shootFire()
		{
			//console.log('Shoot Fire');
			this.assets.l1_Player.animations.play('shoot');
			this.game.time.events.add(Phaser.Timer.QUARTER, function ()
			{
				this.assets.l1_Player.animations.play('idle');
			}.bind(this));
			if (this.localVars.l1_Player.carrotsCount > 0)
			{
				this.localVars.l1_Player.carrotsCount--;
				this.assets.l1_Carrot_Txt.text = 'X ' + String(this.localVars.l1_Player.carrotsCount);
				this.createNewBullet();
			}
		}
		//-----------------------------------------------------------------------------------------------
		hitWater(player, tile)
		{
			if (player.key == 'ALS_Player')
			{
				player.frame = 1;
				player.body.enable = false;
				player.animations.stop();
				this.localVars.l1_Player.waitingForKill = true;
				if (this.localVars.l1_Player.speed < 0)
				{
					this.localVars.l1_Player.speed *= -1;
					this.assets.l1_Player.scale.x *= -1;
				}
				this.game.time.events.add(Phaser.Timer.QUARTER , function ()
				{
					this.resetPlayer();
				}.bind(this));
			} else if (player.key == 'L1_Snake_Sprite')
			{
				var snakePosition = this.localVars.l1_Snakes.position[String(this.assets.l1_Snakes_Group.getIndex(player))];
				player.reset(snakePosition.x, snakePosition.y);
			} else if (player.key == 'L1_Turtle_Sprite')
			{
				var turtlePosition = this.localVars.l1_Turtles.position[String(this.assets.l1_Turtles_Group.getIndex(player))];
				player.reset(turtlePosition.x, turtlePosition.y);
			}
		}
		hitGate(player, gate)
		{
			console.log("hitGate");
			if (player.key == 'ALS_Player')
			{
				player.frame = 1;
				player.body.enable = false;
				player.animations.stop();
				player.alpha = 0;
				this.localVars.l1_Player.waitingForKill = true;
				if (this.localVars.l1_Player.speed < 0)
				{
					this.localVars.l1_Player.speed *= -1;
					this.assets.l1_Player.scale.x *= -1;
				}
				//this.game.time.events.add(Phaser.Timer.QUARTER, function ()
				//{
					//this.resetPlayer();
				//}.bind(this));
				this.assets.l1_Player_Winning.x = player.x;
				this.assets.l1_Player_Winning.y = player.y;
				this.assets.l1_Player_Winning.alpha = 1;
				this.assets.l1_Player_Winning.animations.play('dance');
				this.playerPositionTween(this.assets.l1_Player_Winning, gate);
			}
		}
		playerPositionTween(player, gate)
		{
			var playerMove = this.add.tween(player);
			playerMove.to({ x: gate.x+128, y: gate.y+180 }, 1000, Phaser.Easing.Linear.None);
			playerMove.onComplete.addOnce(this.playerPositionTweenFinished, this);
			playerMove.start();
		}
		playerPositionTweenFinished()
		{
			//console.log(this.assets.l1_Gate_Group.children[0]);
			this.assets.l1_Gate_Group.callAll('animations.play', 'animations', 'open');
			this.assets.l1_Gate_Group.children[0].animations.currentAnim.onComplete.add(this.gateClosed, this);
			this.playerScaleTween(this.assets.l1_Player_Winning);
		}
		playerScaleTween(player)
		{
			//console.log(player.x, player.y);
			var playerScale = this.add.tween(player.scale);
			playerScale.to({ x: 0.8, y: 0.8 }, 700, Phaser.Easing.Linear.None);
			playerScale.onComplete.addOnce(this.playerScaleTweenFinished.bind(this), this);
			playerScale.start();
		}
		playerScaleTweenFinished()
		{
			console.log("we are here");
			this.assets.l1_Player_Winning.alpha = 0;
		}
		gateClosed()
		{
			console.log("gateClosed");
			this.assets.go_Life_Txt.text = 'X ' + String(this.localVars.l1_Player.lifesCount * RabbitRunGame.Constants.GAME_LEVEL1.LIFE_SCORE);
			this.assets.go_Carrot_Txt.text = 'X ' + String(this.localVars.l1_Player.carrotsCount * RabbitRunGame.Constants.GAME_LEVEL1.CARROT_SCORE);
			this.assets.go_Coin_Txt.text = 'X ' + String(this.localVars.l1_Player.coinsCount * RabbitRunGame.Constants.GAME_LEVEL1.COIN_SCORE);
			this.assets.go_Time_Txt.text = 'X ' + String(RabbitRunGame.Constants.GAME_LEVEL1.TOTAL_LEVEL_TIME_SCORE - (this.localVars.l1_Player.carrotsCount * RabbitRunGame.Constants.GAME_LEVEL1.SUBTRACT_TIME_SCORE));
			this.assets.go_Total_Score_Txt.text = 'X ' + String(
				(this.localVars.l1_Player.lifesCount * RabbitRunGame.Constants.GAME_LEVEL1.LIFE_SCORE) +
				(this.localVars.l1_Player.carrotsCount * RabbitRunGame.Constants.GAME_LEVEL1.CARROT_SCORE) +
				(this.localVars.l1_Player.coinsCount * RabbitRunGame.Constants.GAME_LEVEL1.COIN_SCORE) +
				(RabbitRunGame.Constants.GAME_LEVEL1.TOTAL_LEVEL_TIME_SCORE - (this.localVars.l1_Player.carrotsCount * RabbitRunGame.Constants.GAME_LEVEL1.SUBTRACT_TIME_SCORE))
			);
			//
			this.openGameOverWindow();
		}
		collectCoins(player, coin)
		{
			this.localVars.l1_Player.coinsCount++;
			this.assets.l1_Coin_Txt.text = 'X ' + String(this.localVars.l1_Player.coinsCount);
			coin.kill();
		}
		collectRubies(player, ruby)
		{
			this.localVars.l1_Player.rubiesCount++;
			this.assets.l1_Ruby_Txt.text = 'X ' + String(this.localVars.l1_Player.rubiesCount);
			ruby.kill();
		}

		collectCarrots(player, carrot)
		{
			this.localVars.l1_Player.carrotsCount++;
			this.assets.l1_Carrot_Txt.text = 'X ' + String(this.localVars.l1_Player.carrotsCount);
			carrot.kill();
		}

		hitSnakes(player, snake)
		{
			//console.log(player.body.touching.down);
			if (player.body.touching.down)
			{
				snake.animations.stop();
				snake.frame = 1;
				snake.body.enable = false;
				player.body.velocity.y -= 580;
				this.game.time.events.add(Phaser.Timer.QUARTER , function ()
				{
					snake.kill();
				});
			} else
			{
				player.frame = 1;
				player.body.enable = false;
				player.animations.stop();
				this.localVars.l1_Player.waitingForKill = true;
				if (this.localVars.l1_Player.speed < 0)
				{
					this.localVars.l1_Player.speed *= -1;
					this.assets.l1_Player.scale.x *= -1;
				}
				this.game.time.events.add(Phaser.Timer.QUARTER , function ()
				{
					this.resetPlayer();
				}.bind(this));
			}
		}
		hitTurtles(player, turtle)
		{
			//console.log(player.body.touching.down);
			if (player.body.touching.down)
			{
				turtle.animations.stop();
				turtle.frame = 1;
				turtle.body.enable = false;
				player.body.velocity.y -= 580;
				this.game.time.events.add(Phaser.Timer.QUARTER , function ()
				{
					turtle.kill();
				});
			} else
			{
				player.frame = 1;
				player.body.enable = false;
				player.animations.stop();
				this.localVars.l1_Player.waitingForKill = true;
				if (this.localVars.l1_Player.speed < 0)
				{
					this.localVars.l1_Player.speed *= -1;
					this.assets.l1_Player.scale.x *= -1;
				}
				this.game.time.events.add(Phaser.Timer.QUARTER , function ()
				{
					this.resetPlayer();
				}.bind(this));
			}
		}
		resetPlayer()
		{
			//console.log('resetPlayer');
			if (this.localVars.l1_Player.lifesCount > 0)
			{
				this.localVars.l1_Player.lifesCount--;
				//console.log(this.localVars.l1_Player.lifesCount);
				this.updateLifeCount();
				if (this.localVars.l1_Player.lifesCount == 0)
				{
					//console.log('gameOver');
					//
					this.assets.go_Life_Txt.text = 'X ' + String(this.localVars.l1_Player.lifesCount * RabbitRunGame.Constants.GAME_LEVEL1.LIFE_SCORE);
					this.assets.go_Carrot_Txt.text = 'X ' + String(this.localVars.l1_Player.carrotsCount * RabbitRunGame.Constants.GAME_LEVEL1.CARROT_SCORE);
					this.assets.go_Coin_Txt.text = 'X ' + String(this.localVars.l1_Player.coinsCount * RabbitRunGame.Constants.GAME_LEVEL1.COIN_SCORE);
					this.assets.go_Time_Txt.text = 'X ' + String(RabbitRunGame.Constants.GAME_LEVEL1.TOTAL_LEVEL_TIME_SCORE - (this.localVars.l1_Player.carrotsCount * RabbitRunGame.Constants.GAME_LEVEL1.SUBTRACT_TIME_SCORE));
					this.assets.go_Total_Score_Txt.text = 'X ' + String(
						(this.localVars.l1_Player.lifesCount * RabbitRunGame.Constants.GAME_LEVEL1.LIFE_SCORE) +
						(this.localVars.l1_Player.carrotsCount * RabbitRunGame.Constants.GAME_LEVEL1.CARROT_SCORE) +
						(this.localVars.l1_Player.coinsCount * RabbitRunGame.Constants.GAME_LEVEL1.COIN_SCORE) +
						(RabbitRunGame.Constants.GAME_LEVEL1.TOTAL_LEVEL_TIME_SCORE - (this.localVars.l1_Player.carrotsCount * RabbitRunGame.Constants.GAME_LEVEL1.SUBTRACT_TIME_SCORE))
					);
					//
					this.openGameOverWindow();
					//this.game.state.start('LevelsScreen');
				} else
				{
					this.assets.l1_Player.reset(RabbitRunGame.Constants.GAME_LEVEL1.PLAYER_START_X, RabbitRunGame.Constants.GAME_LEVEL1.PLAYER_START_Y);
					this.game.time.events.add(Phaser.Timer.QUARTER, function ()
					{
						this.assets.l1_Player.body.enable = true;
						this.localVars.l1_Player.waitingForKill = false;
						this.assets.l1_Player.body.velocity.x = this.localVars.l1_Player.speed;
					}.bind(this));
				}
			}

		}

		killSnake(bullet, snake)
		{
			//console.log(bullet);
			//console.log(snake);
			snake.animations.stop();
			snake.frame = 1;
			snake.body.enable = false;
			this.game.time.events.add(Phaser.Timer.QUARTER, function ()
			{
				snake.kill();
			});
			bullet.kill();
		}

		killTurtle(bullet, turtle)
		{
			//console.log(bullet);
			//console.log(turtle);
			turtle.animations.stop();
			turtle.frame = 1;
			turtle.body.enable = false;
			this.game.time.events.add(Phaser.Timer.QUARTER, function ()
			{
				turtle.kill();
			});
			bullet.kill();
		}
		//-----------------------------------------------------------------------------------------------
		openGameOverWindow()
		{
			// console.log('openGameOverWindow');
			if ((this.tween && this.tween.isRunning) || this.assets.go_Bg_img.scale.x === 1)
			{
				return;
			} else
			{
				this.tween = this.add.tween(this.assets.go_Bg_img.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
			}
		}

		closeGameOverWindow()
		{
			// console.log('closeGameOverWindow');
			if ((this.tween && this.tween.isRunning) || this.assets.go_Bg_img.scale.x === 0)
			{
				return;
			} else
			{
				this.tween = this.add.tween(this.assets.go_Bg_img.scale).to({ x: 0, y: 0 }, 500, Phaser.Easing.Elastic.In, true);
			}
		}
		//-----------------------------------------------------------------------------------------------
		goExitClicked()
		{
			//console.log('goExitClicked');
			this.game.state.start('LevelsScreen');
		}
		goPlayAgainClicked()
		{
			//console.log('goPlayAgainClicked');
			this.game.state.start('Level1Preloader');
		}
		//-----------------------------------------------------------------------------------------------s
		testMe()
		{
			console.log('testMe');
		}
	}
}
