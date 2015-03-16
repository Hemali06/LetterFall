Candy.Help = function(game){};
Candy.Help.prototype = {
	create: function(){
         
        this.add.sprite(0,0,'instructions');

        this.add.button(50,30, 'icons', this.back, this,'backIcon.png','backIcon.png','backIcon.png','backIcon.png');
	},

	back: function() {
		// start the Game state
		this.state.start('MainMenu');
	}
};