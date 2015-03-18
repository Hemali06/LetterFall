Candy.Play = class Play

  constructor: (game)->
    @fontStyle =
      font: '22px Arial Bold Italic'
      fill: '#8a1e91'
    @fontStyle1 =
      font: '64px Arial Bold Italic'
      fill: '#003791'
    Candy.words=["abandon","behaviour","cascading"];
    Candy.wordIndex=0;
    @letter;
    @dx = null
    return

  create: ->
    @add.sprite(0,0,'background')
    @add.text(322,180, "Collect the letters", @fontStyle);
    word_text = @add.text(this.world.centerX,80,Candy.words[Candy.wordIndex],@fontStyle1);
    word_text.anchor.setTo 0.5, 0.5
    @dx=0
    word_length = Candy.words[Candy.wordIndex].length
    position = (word_length*50)/2
    @wordd = []

    i = 0
    while i < Candy.words[Candy.wordIndex].length
      @letter = Candy.words[Candy.wordIndex].substr(i, 1).toUpperCase()
      @wordd[i] = @add.sprite(@world.centerX - position + @dx, 260, 'alphabets', @letter + '.png')
      @dx += 50
      i++

    @add.button(50,30, 'icons', @back, this,'backIcon.png','backIcon.png','backIcon.png','backIcon.png');
    @add.button(300,400,'buttons', @startWord, this,'start.png','start.png','start.png','start.png')
    @add.button(300,470,'buttons',@nextWord,this,'nextWord.png','nextWord.png','nextWord.png','nextWord.png')

  nextWord: ->
    i = 0
    while i < Candy.words[Candy.wordIndex].length
      @wordd[i].destroy()
      i++
    Candy.wordIndex++
    @state.start 'Play'
    return

  back: ->
    @state.start 'MainMenu'
    return

  startWord: ->
    i = 0
    while i < Candy.words[Candy.wordIndex].length
      @wordd[i].destroy()
      i++
    @state.start 'LetterFall'
    return