Candy.BombPicked = class BombPicked

  create: ->
    @add.sprite(0,0,'background')
    @add.sprite(100,100,'oops')
    @add.button(180,350, 'iconsWithText', @tryAgain, this,'tryAgainIcon.png','tryAgainIcon.png','tryAgainIcon.png','tryAgainIcon.png')
    @add.button(520,350, 'iconsWithText', @back, this,'mainMenuIcon.png','mainMenuIcon.png','mainMenuIcon.png','mainMenuIcon.png')
    return

  tryAgain: ->
    @state.start 'Play'
    return

  mainMenu: ->
    @state.start 'MainMenu'
    return