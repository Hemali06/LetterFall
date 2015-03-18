Candy.HighScores = class HighScores

  create: ->
    @add.sprite(0,0,'highscoresScreen');

    @add.button(50,30, 'icons', @back, this,'backIcon.png','backIcon.png','backIcon.png','backIcon.png');
    return

  back: ->
    @state.start 'MainMenu'
    return