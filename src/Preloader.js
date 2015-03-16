Candy.Preloader = function(game){
	// define width and height of the game
	Candy.GAME_WIDTH = 800;
	Candy.GAME_HEIGHT = 600;
};
Candy.Preloader.prototype = {
	preload: function(){
		// set background color and preload image		
		
		this.add.sprite(0,0,'background');
		this.add.sprite(0, 0, 'letterfall');

		this.preloadBar = this.add.sprite(Candy.GAME_WIDTH-600, Candy.GAME_HEIGHT-250 , 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);

		// load images
	    this.load.image('instructions','img/instructions.png');
	    this.load.image('bomb', 'img/bomb.png');
	    this.load.image('oops','img/oops.png');
	    this.load.image('highscoresScreen','img/highscoresScreen.png');


	    //load spritesheets
	    this.load.atlasJSONHash('alphabets', 'img/alphabets.png', 'img/alphabets.json');
	    this.load.atlasJSONHash('buttons', 'img/buttons.png', 'img/buttons.json');
	    this.load.atlasJSONHash('iconsWithText', 'img/iconsWithText.png', 'img/iconsWithText.json');
	    this.load.atlasJSONHash('icons', 'img/icons.png', 'img/icons.json');
	    this.load.atlasJSONHash('elements','img/elements.png','img/elements.json');
	    this.load.spritesheet('player', 'img/playerSprite.png',40,60,8);

	},

	create: function(){
		// start the MainMenu state
		this.state.start('MainMenu');
	}
	
};