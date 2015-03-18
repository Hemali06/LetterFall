// Generated by CoffeeScript 1.9.1
(function() {
  var Play;

  Candy.Play = Play = (function() {
    function Play(game) {
      this.fontStyle = {
        font: '22px Arial Bold Italic',
        fill: '#8a1e91'
      };
      this.fontStyle1 = {
        font: '64px Arial Bold Italic',
        fill: '#003791'
      };
      Candy.words = ["abandon", "behaviour", "cascading"];
      Candy.wordIndex = 0;
      this.letter;
      this.dx = null;
      return;
    }

    Play.prototype.create = function() {
      var i, position, word_length, word_text;
      this.add.sprite(0, 0, 'background');
      this.add.text(322, 180, "Collect the letters", this.fontStyle);
      word_text = this.add.text(this.world.centerX, 80, Candy.words[Candy.wordIndex], this.fontStyle1);
      word_text.anchor.setTo(0.5, 0.5);
      this.dx = 0;
      word_length = Candy.words[Candy.wordIndex].length;
      position = (word_length * 50) / 2;
      this.wordd = [];
      i = 0;
      while (i < Candy.words[Candy.wordIndex].length) {
        this.letter = Candy.words[Candy.wordIndex].substr(i, 1).toUpperCase();
        this.wordd[i] = this.add.sprite(this.world.centerX - position + this.dx, 260, 'alphabets', this.letter + '.png');
        this.dx += 50;
        i++;
      }
      this.add.button(50, 30, 'icons', this.back, this, 'backIcon.png', 'backIcon.png', 'backIcon.png', 'backIcon.png');
      this.add.button(300, 400, 'buttons', this.startWord, this, 'start.png', 'start.png', 'start.png', 'start.png');
      return this.add.button(300, 470, 'buttons', this.nextWord, this, 'nextWord.png', 'nextWord.png', 'nextWord.png', 'nextWord.png');
    };

    Play.prototype.nextWord = function() {
      var i;
      i = 0;
      while (i < Candy.words[Candy.wordIndex].length) {
        this.wordd[i].destroy();
        i++;
      }
      Candy.wordIndex++;
      this.state.start('Play');
    };

    Play.prototype.back = function() {
      this.state.start('MainMenu');
    };

    Play.prototype.startWord = function() {
      var i;
      i = 0;
      while (i < Candy.words[Candy.wordIndex].length) {
        this.wordd[i].destroy();
        i++;
      }
      this.state.start('LetterFall');
    };

    return Play;

  })();

}).call(this);
