Candy.LetterFall = class LetterFall

  constructor: (game)->
    @fontStyle =
      font: '32px Arial Bold Italic'
      fill: '#FFFFFF'
    @fontStyle1 =
      font: '32px Arial Bold Italic'
      fill: '#003791'
    @leftKey = null
    @rightKey = null
    return

  create: ->
    @add.sprite(0,0,'background')
    @add.sprite(240,-5,'elements','displayWord.png')
    @add.sprite(-20,-17,'elements','displayScore.png');
    @add.button(650,13, 'icons', @managePause, this,'pause.png','pause.png','pause.png','pause.png')
    @add.button(720,12, 'icons', @backtomain, this,'backtomain.png','backtomain.png','backtomain.png','backtomain.png')
    @totalLetters = 7
    @letters = []
    @velocityValues = [150,220,250,300,230,190]
    Candy._scoreText = null
    Candy._score = 0
    @rightLetterIndex=0
    @wordLength = Candy.words[Candy.wordIndex].length
    @wordIndex = 0
    @currentText=null
    @fontsize=0
    @bomb=0
    @player=null
    @facing = 'right'

    @player = @add.sprite(0,540, 'player')
    @player.animations.add('left', [4, 5, 6, 7], 5, true)
    @player.animations.add('right', [0, 1, 2, 3], 5, true)

    word_text = @add.text(this.world.centerX,80,this.score);
    @leftKey = @input.keyboard.addKey(Phaser.Keyboard.LEFT);
    @rightKey = @input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    #  Enable p2 physics
    @game.physics.startSystem Phaser.Physics.ARCADE
    @game.physics.enable @player, Phaser.Physics.ARCADE
    @game.physics.setBoundsToWorld()

    # initialize the score text with 0
    Candy._scoreText = @add.text(30,17, "0", @fontStyle);    
    @resetLetters()
    return

  resetLetters: ->
    i = 0
    while i < @totalLetters
      x = @getX(i)
      y = 15 + Math.random() * 30
      letter = @randomLetter(Candy.wordIndex).toUpperCase()
      @letters[i] = @add.sprite(x, y, 'alphabets', letter + '.png')
      @physics.enable @letters[i], Phaser.Physics.ARCADE
      lettervelocity = @velocityValues[@randomNumber(@velocityValues.length)]
      @letters[i].body.velocity.y = lettervelocity
      @letters[i].checkWorldBounds = true
      @letters[i].keyIndex = i
      @letters[i].isPointGiven = false
      @letters[i].events.onOutOfBounds.add @reset, this
      i++
    return

  reset: (resetLetter) ->
    x = resetLetter.x
    y = 15 + Math.random() * 30;
    letter = @randomLetter(Candy.wordIndex).toUpperCase()
    
    if(@bomb==7)
      @letters[resetLetter.keyIndex] = @add.sprite(x,y,'bomb')
      @bomb=0
      @letters[resetLetter.keyIndex].key = '@'
    else
      @letters[resetLetter.keyIndex] = @add.sprite(x,y,'alphabets',letter+'.png')
      @bomb++;

    @physics.enable @letters[resetLetter.keyIndex], Phaser.Physics.ARCADE
    lettervelocity = @velocityValues[@randomNumber(@velocityValues.length)]
    @letters[resetLetter.keyIndex].body.velocity.y = lettervelocity
    @letters[resetLetter.keyIndex].checkWorldBounds = true
    @letters[resetLetter.keyIndex].keyIndex = resetLetter.keyIndex
    @letters[resetLetter.keyIndex].isPointGiven=false
    @letters[resetLetter.keyIndex].alpha = 1
    @letters[resetLetter.keyIndex].events.onOutOfBounds.add @reset,this
    return

  randomNumber: (max) ->
    randomNum = Math.random()
    numExpanded = randomNum * max
    numFloored = Math.floor(numExpanded)
    return numFloored

  getX: (index) ->
    addition = 1 + Math.random()*100
    base = 0
    i = 0
    while i < index
      base = base + 110
      i++
    final_return = base + addition
    return final_return

  randomLetter: (wordIndex) ->
    randomItem = Candy.words[Candy.wordIndex]
    randomPosition = Math.floor(Math.random()*(randomItem.length))
    randomItem=randomItem.substr(randomPosition,1)
    return randomItem

  backtomain: ->
    @state.start 'MainMenu'
    return

  managePause: ->
    @game.paused = true
    # add proper informational text
    pausedText = @add.text(@world.centerX,250, "Game paused.\nTap anywhere to continue.", @fontStyle1)
    pausedText.anchor.setTo 0.5, 0.5
    # set event listener for the users click/tap the screen
    @input.onDown.add (->
      # remove the pause text
      pausedText.destroy()
      # unpause the game
      @game.paused = false
      return
    ), this
    return

  setPoints: (player,letter) ->
    if (letter.key=='@')
      @state.start 'BombPicked'
    else
      if(letter.isPointGiven==false)
        if(letter.frameName.substr(0,1).toLowerCase()==Candy.words[Candy.wordIndex][@rightLetterIndex])
          position = @wordLength/2*16;
          currentText = @add.text(@world.centerX+@fontsize-position,15,letter.frameName.substr(0,1).toLowerCase(), @fontStyle);
          @fontsize += currentText.width;
                
          Candy._score++
          @rightLetterIndex++
          Candy._scoreText.setText(Candy._score)
          @wordIndex++
          if (@wordLength==@wordIndex)
            @state.start 'FinalScreen'
        else
          Candy._score--
          Candy._scoreText.setText(Candy._score)
        
        letter.isPointGiven=true;
        letter.alpha=0;
    return

  update: ->
    game.physics.arcade.overlap @player, @letters, @setPoints, null, this
    @player.body.velocity.x = 0;

    if (@leftKey.isDown)
      if (@player.body.x > 0)
        @player.body.velocity.x = -200
      if (@facing != 'left')
        @player.animations.play('left')
        @facing = 'left'
    else if (@rightKey.isDown)
      if (@player.body.x <= Candy.GAME_WIDTH - @player.width)
        @player.body.velocity.x = 200
      if (@facing != 'right')
        @player.animations.play('right')
        @facing = 'right'
    else
      if (@facing != 'idle')
        if (@facing == 'left')
          @player.frame = 4
        else
          @player.frame = 0
        @facing = 'idle'
    return

  mainMenu: ->
    @state.start 'MainMenu'
    return