Candy.Play = function(game){
        
        Candy._words=["abandon","behaviour","cascading"];
        Candy._wordIndex=0;
        this._letter;
        this._dx;

};
Candy.Play.prototype = {
	create: function(){
		// display images
		this.add.sprite(0, 0, 'background');
		
		this._fontStyle = { font: "22px Arial Bold Italic", fill: "#8a1e91", align: "center" };
		this.add.text(322,180, "Collect the letters", this._fontStyle);
		this._fontStyle1 = { font: "64px Arial Bold Italic", fill: "#003791", align: "center" };
		word_text = this.add.text(this.world.centerX,80,Candy._words[Candy._wordIndex],this._fontStyle1);
		word_text.anchor.setTo(0.5, 0.5);
        this._dx=0;
        word_length = Candy._words[Candy._wordIndex].length;
        position = word_length*50/2;
        wordd = [];
        

		for (var i = 0; i < Candy._words[Candy._wordIndex].length; i++) {
			
			this._letter = Candy._words[Candy._wordIndex].substr(i,1).toUpperCase();
			wordd[i]=this.add.sprite(this.world.centerX-position+this._dx,260,'alphabets',this._letter+'.png');
			this._dx+=50;

		};

	    // add the button that will start the game
		this.add.button(300,400,'buttons', this.startWord, this,'start.png','start.png','start.png','start.png');
		this.add.button(300,470,'buttons',this.nextWord,this,'nextWord.png','nextWord.png','nextWord.png','nextWord.png');
	},

	nextWord: function(){
		for (var i = 0; i < Candy._words[Candy._wordIndex].length; i++) {
	            wordd[i].destroy();
	        }
	    Candy._wordIndex++;
        this.state.start('Play');
    },

	startWord: function() {
		for (var i = 0; i < Candy._words[Candy._wordIndex].length; i++) {
	            wordd[i].destroy();
	        }
		// start the Game state
		this.state.start('LetterFall');
	}

};