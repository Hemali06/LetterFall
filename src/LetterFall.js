Candy.LetterFall = function(game){
    var leftKey;
    var rightKey;
};

Candy.LetterFall.prototype= {

    
    create : function() {

        this.add.sprite(0,0,'background');
        this.add.sprite(240,-5,'elements','displayWord.png');
        this.add.sprite(-20,-17,'elements','displayScore.png');
        this.add.button(650,13,'icons', this.managePause, this,'pause.png','pause.png','pause.png','pause.png');
        this.add.button(720,12,'icons',this.backtomain,this,'backtomain.png','backtomain.png','backtomain.png','backtomain.png');
        this.totalLetters = 7;
        this._letters = [];
        this.velocityValues = [150,220,250,300,230,190];
        Candy._scoreText = null;
        Candy._score = 0;
        this._rightLetterIndex=0;
        this.wordLength = Candy._words[Candy._wordIndex].length;
        this.wordIndex = 0;
        this.currentText=null;
        this.fontsize=0;
        this.bomb=0;
        this.player=null;
        this.facing = 'right';

        this.player = this.add.sprite(0,540, 'player');

        this.player.animations.add('left', [4, 5, 6, 7], 5, true);
        this.player.animations.add('right', [0, 1, 2, 3], 5, true);

        word_text = this.add.text(this.world.centerX,80,this.score);
        leftKey = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.enable(this.player);
        this.physics.setBoundsToWorld();

        this._fontStyle = { font: "32px Arial Bold Italic", fill: "#FFFFFF", align: "center" };
        this._fontStyle1 = { font: "32px Arial Bold Italic", fill: "#003791", align: "center" };

        // initialize the score text with 0
        Candy._scoreText = this.add.text(30,17, "0", this._fontStyle);    
        this.resetLetters();
    },

    resetLetters : function(){
        for (var i = 0; i < this.totalLetters; i++) {
            x = this.getX(i);
            y = 15 + Math.random() * 30;
            letter = this.randomLetter(Candy._wordIndex).toUpperCase();
            this._letters[i] = this.add.sprite(x,y,'alphabets',letter+'.png');  
            this.physics.arcade.enable(this._letters[i]);
            lettervelocity = this.velocityValues[this.randomNumber(this.velocityValues.length)];
            this._letters[i].body.velocity.y = lettervelocity;
            this._letters[i].checkWorldBounds = true;
            this._letters[i].keyIndex = i;
            this._letters[i].isPointGiven=false;
            this._letters[i].events.onOutOfBounds.add(this.reset,this);
        }
    },


    reset: function(resetLetter) {

        x = resetLetter.x;
        y = 15 + Math.random() * 30;
        letter = this.randomLetter(Candy._wordIndex).toUpperCase();

            if(this.bomb==7)
            {
                this._letters[resetLetter.keyIndex] = this.add.sprite(x,y,'bomb');
                this.bomb=0;
                this._letters[resetLetter.keyIndex].key = '@';
            }
            else
            {
                this._letters[resetLetter.keyIndex] = this.add.sprite(x,y,'alphabets',letter+'.png');
                this.bomb++;
            } 
        this.physics.arcade.enable(this._letters[resetLetter.keyIndex]);
        lettervelocity = this.velocityValues[this.randomNumber(this.velocityValues.length)];
        this._letters[resetLetter.keyIndex].body.velocity.y = lettervelocity;
        this._letters[resetLetter.keyIndex].checkWorldBounds = true;
        this._letters[resetLetter.keyIndex].keyIndex = resetLetter.keyIndex;
        this._letters[resetLetter.keyIndex].isPointGiven=false;
        this._letters[resetLetter.keyIndex].alpha = 1;
        this._letters[resetLetter.keyIndex].events.onOutOfBounds.add(this.reset,this);

},

    randomNumber : function(max) 
     {

    
        var randomNum       = Math.random();
        var numExpanded     = randomNum * max;
        var numFloored      = Math.floor(numExpanded);
    
        return numFloored;
     },


    getX : function(index){
        var addition = 1 + Math.random()*100;
        var base = 0;
        for (var i = 0; i < index; i++) {
            base = base + 110;
        }
        var final_return = base + addition;
        return final_return;
    },

    randomLetter : function(wordIndex){
        var randomItem = Candy._words[wordIndex];
        var randomPosition = Math.floor(Math.random()*(randomItem.length));
        randomItem=randomItem.substr(randomPosition,1);
        return randomItem;
    },


    backtomain : function(){
        this.state.start('MainMenu');
    },

   managePause: function(){
        // pause the game
        this.game.paused = true;
        // add proper informational text
        pausedText = this.add.text(this.world.centerX,250, "Game paused.\nTap anywhere to continue.", this._fontStyle1);
        pausedText.anchor.setTo(0.5, 0.5);
        // set event listener for the user's click/tap the screen
        this.input.onDown.add(function(){
            // remove the pause text
            pausedText.destroy();
            // unpause the game
            this.game.paused = false;
        }, this);
    },

     setPoints: function(player,letter) {       
        
            if (letter.key=='@') {
                this.state.start('BombPicked');
            }
            else
            {
            if(letter.isPointGiven==false)
            {
            if(letter.frameName.substr(0,1).toLowerCase()==Candy._words[Candy._wordIndex][this._rightLetterIndex])
            {
                this.position = this.wordLength/2*16;
                this.currentText = this.add.text(this.world.centerX+this.fontsize-this.position,15,letter.frameName.substr(0,1).toLowerCase(), this._fontStyle);
                this.fontsize+=this.currentText.width;
                
                Candy._score++;
                this._rightLetterIndex++;
                Candy._scoreText.setText(Candy._score); 
                this.wordIndex++;  
                if (this.wordLength==this.wordIndex)
                  { 
                     this.state.start('FinalScreen');
                   }

            }   
            else
            {
                
                Candy._score--;
                Candy._scoreText.setText(Candy._score);
            }
            letter.isPointGiven=true;
            letter.alpha=0;
            } 
            }       
        
    },


    update : function() {

        this.game.physics.arcade.overlap(this.player, this._letters, this.setPoints, null, this);
        
        
        this.player.body.velocity.x = 0;

        if (leftKey.isDown)
        {
            if (this.player.body.x > 0) {
                this.player.body.velocity.x = -200;
            }

            if (this.facing != 'left')
            {
                this.player.animations.play('left');
                this.facing = 'left';
            }
        }
        else if (rightKey.isDown)
        {
            if (this.player.body.x <= Candy.GAME_WIDTH - this.player.width) {
               this.player.body.velocity.x = 200;
            }
     
            if (this.facing != 'right')
            {
                this.player.animations.play('right');
                this.facing = 'right';
            }
        }
        else
        {
            if (this.facing != 'idle')
            {
      
                if (this.facing == 'left')
                {
                    this.player.frame = 4;
                }
                else
                {
                    this.player.frame = 0;
                }

             this.facing = 'idle';
            }
        }
    }
   
};