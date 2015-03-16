Candy.BombPicked = function(game){
};
Candy.BombPicked.prototype = {
	create: function(){
		this.add.sprite(0,0,'background');
		this.add.sprite(100,100,'oops');
		this.add.button(180,350, 'iconsWithText', this.tryAgain, this,'tryAgainIcon.png','tryAgainIcon.png','tryAgainIcon.png','tryAgainIcon.png');
		this.add.button(520,350,'iconsWithText',this.mainMenu,this,'mainMenuIcon.png','mainMenuIcon.png','mainMenuIcon.png','mainMenuIcon.png');
	},

	tryAgain: function() {
		this.state.start('Play');
	},

	mainMenu: function(){
		this.state.start('MainMenu');
	}
};