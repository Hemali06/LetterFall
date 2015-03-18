Candy.Preloader = class Preloader

  constructor: (game)->
  	Candy.GAME_WIDTH = 800
  	Candy.GAME_HEIGHT = 600
  	return
  
  create: ->
  	@state.start 'MainMenu'
  	return

  preload: ->
  	@add.sprite(0, 0,'background')
  	@add.sprite(0, 0, 'letterfall')
  	@preloadBar = @add.sprite(Candy.GAME_WIDTH-600, Candy.GAME_HEIGHT-250 , 'preloaderBar')
  	@game.load.setPreloadSprite @preloadBar
  	# load images
  	@game.load.image 'instructions','img/instructions.png'
  	@game.load.image 'bomb', 'img/bomb.png'
  	@game.load.image 'oops','img/oops.png'
  	@game.load.image 'highscoresScreen','img/highscoresScreen.png'
  	# load spritesheets
  	@game.load.atlasJSONHash 'alphabets', 'img/alphabets.png', 'img/alphabets.json'
  	@game.load.atlasJSONHash 'buttons', 'img/buttons.png', 'img/buttons.json'
  	@game.load.atlasJSONHash 'iconsWithText', 'img/iconsWithText.png', 'img/iconsWithText.json'
  	@game.load.atlasJSONHash 'icons', 'img/icons.png', 'img/icons.json'
  	@game.load.atlasJSONHash 'elements', 'img/elements.png', 'img/elements.json'
  	@game.load.spritesheet 'player', 'img/playerSprite.png',40,60,8
  	return