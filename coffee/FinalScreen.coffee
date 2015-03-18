Candy.FinalScreen = class FinalScreen

  constructor: (game)->
    @fontStyle =
      font: '30px Arial Bold Italic'
      fill: '#003791'
    @fontStyle1 =
      font: '36px Arial Bold Italic'
      fill: '#003791'
    return

  create: ->
    @add.sprite(0,0,'background')
    @add.text(190,80, "Maximum possible score :", @fontStyle);
    @add.text(570,80,@words[@wordIndex].length,@fontStyle);

    @add.text(270,200, "You Scored :", fontStyle1);
    @add.text(500,200,@score,@fontStyle1);
    @add.button(180,350, 'iconsWithText', @tryAgain, this,'tryAgainIcon.png','tryAgainIcon.png','tryAgainIcon.png','tryAgainIcon.png')
    @add.button(350,350, 'iconsWithText', @nextWord, this,'nextWordIcon.png','nextWordIcon.png','nextWordIcon.png','nextWordIcon.png')
    @add.button(520,350, 'iconsWithText', @mainMenu, this,'mainMenuIcon.png','mainMenuIcon.png','mainMenuIcon.png','mainMenuIcon.png')
    return

  tryAgain: ->
    @state.start 'Play'
    return

  nextWord: ->
    @state.start 'Play'
    return

  mainMenu: ->
    @state.start 'MainMenu'
    return