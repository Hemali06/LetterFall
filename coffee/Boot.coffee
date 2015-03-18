window.Candy or (window.Candy = {})

Candy.Boot = class Boot
  constructor: (game)->
    console.log '%cBooting my awesome game', 'color:white; background:red'
    return

  init: ->
    @input.maxPointers = 1
    @stage.disableVisibilityChange = true
    if @game.device.desktop
      @scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
      @scale.setMinMax 480, 360, 800, 600
      @scale.pageAlignHorizontally = true
      @scale.pageAlignVertically = true
    else
      @scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
      @scale.setMinMax 480, 360, 800, 600
      @scale.pageAlignHorizontally = true
      @scale.pageAlignVertically = true
    return

  preload: ->
    @load.image 'preloaderBar', 'img/loadingBar.png'
    @load.image 'letterfall','img/letterfall.png'
    @load.image 'background','img/background.png'
    return

  create: ->
    @game.state.start 'Preloader'
    return