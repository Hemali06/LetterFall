Candy.MainMenu = function(game){};
Candy.MainMenu.prototype = {
	create: function(){
		// display images
		this.add.sprite(0,0,'background');
		this.add.sprite(0, 0, 'letterfall');
		// add the button that will start the game
		this.add.button(310,380,'buttons', this.startGame, this,'play.png','play.png','play.png','play.png');
		this.add.button(310,450,'buttons',this.highScore,this,'highscores.png','highscores.png','highscores.png','highscores.png');
		this.add.button(310,520,'buttons',this.help,this,'help.png','help.png','help.png','help.png');
	},
	startGame: function() {
		// start the Game state
		this.state.start('Play');
	},
	highScore: function() {
		// start the Game state
		this.state.start('HighScores');
	},
    help: function() {
		this.state.start('Help');
	}
};