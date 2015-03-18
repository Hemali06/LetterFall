Candy.MainMenu = class MainMenu

  create: ->
    @add.sprite(0,0,'background')
    @add.sprite(0,0,'letterfall')

    @add.button(310,380,'buttons', @startGame, this,'play.png','play.png','play.png','play.png')
    @add.button(310,450,'buttons',@highScore,this,'highscores.png','highscores.png','highscores.png','highscores.png')
    @add.button(310,520,'buttons',@help,this,'help.png','help.png','help.png','help.png')

  startGame: ->
  	@game.state.start 'Play'
  	return

  highScore: ->
  	@game.state.start 'HighScores'
  	return

  help: ->
    @game.state.start 'Help'
    return