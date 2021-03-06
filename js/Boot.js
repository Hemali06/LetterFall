// Generated by CoffeeScript 1.9.1
(function() {
  var Boot;

  window.Candy || (window.Candy = {});

  Candy.Boot = Boot = (function() {
    function Boot(game) {
      console.log('%cBooting my awesome game', 'color:white; background:red');
      return;
    }

    Boot.prototype.init = function() {
      this.input.maxPointers = 1;
      this.stage.disableVisibilityChange = true;
      if (this.game.device.desktop) {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setMinMax(480, 360, 800, 600);
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
      } else {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setMinMax(480, 360, 800, 600);
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
      }
    };

    Boot.prototype.preload = function() {
      this.load.image('preloaderBar', 'img/loadingBar.png');
      this.load.image('letterfall', 'img/letterfall.png');
      this.load.image('background', 'img/background.png');
    };

    Boot.prototype.create = function() {
      this.game.state.start('Preloader');
    };

    return Boot;

  })();

}).call(this);
