Candy.FinalScreen = function(game){};
Candy.FinalScreen.prototype = {
	create: function(){
		// display images
		this.add.sprite(0, 0, 'background');
		this._fontStyle = { font: "30px Arial Bold Italic", fill: "#003791", align: "center" };
		this.add.text(190,80, "Maximum possible score :", this._fontStyle);
		this.add.text(570,80,Candy._words[Candy._wordIndex].length,this._fontStyle);

		this._fontStyle1 = { font: "36px Arial Bold Italic", fill: "#003791", align: "center" };
		this.add.text(270,200, "You Scored :", this._fontStyle1);
		this.add.text(500,200,Candy._score,this._fontStyle1);

		// add the button that will start the game
		this.add.button(180,350, 'iconsWithText', this.tryAgain, this,'tryAgainIcon.png','tryAgainIcon.png','tryAgainIcon.png','tryAgainIcon.png');
		this.add.button(350,350,'iconsWithText',this.nextWord,this,'nextWordIcon.png','nextWordIcon.png','nextWordIcon.png','nextWordIcon.png');
		this.add.button(520,350,'iconsWithText',this.mainMenu,this,'mainMenuIcon.png','mainMenuIcon.png','mainMenuIcon.png','mainMenuIcon.png');
	},
	tryAgain: function() {
		this.state.start('Play');
	},

    nextWord: function() {
    	Candy._wordIndex++;
        this.state.start('Play');
	},

	mainMenu: function(){
		this.state.start('MainMenu');
	}
};