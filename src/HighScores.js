Candy.HighScores = function(game){};
Candy.HighScores.prototype = {
	create: function(){
         
        this.add.sprite(0,0,'highscoresScreen');

        this.add.button(50,30, 'icons', this.back, this,'backIcon.png','backIcon.png','backIcon.png','backIcon.png');
	},

	back: function() {
		// start the Game state
		this.state.start('MainMenu');
	}
};