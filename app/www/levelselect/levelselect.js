let Resultscreen = function() {
  const position = {};
    let swipe = {};
  let worldHeight;
  const FONT_STYLE = {
    fill: '#73FFA4',
    fontSize: '24pt'
  };
  const FONT_STYLE_LEVEL_CIRCLE = {
    fontSize: '20pt',
    fill: '#FFFFFF'
  }
  const fontCtrl = new FontCtrl();

  this.preload = function() {
    position.start = game.world.height / 2;
    game.stage.backgroundColor = '#5B1075';
    game.load.image('star-filled', 'levelselect/star-filled.png', 126, 40);
    game.load.image('star-outline', 'levelselect/star-outline.png', 126, 40);
    game.load.script('webfont', 'global/webfont.js');
    setGlobalScalingRules();
  }

  this.create = function() {
    position.sprite = game.add.sprite(0, position.start);
    game.physics.enable(position.sprite, Phaser.Physics.ARCADE);
    game.camera.follow(position.sprite);
    let message;
    let currentLevel = levelCtrl.getCurrentLevel();
    if (currentLevel.isWon()) {
      if (levelCtrl.isCurrentLevelLastLevel()) {
        game.state.start('Credits');
      } else {
        message = 'FINISHED LEVEL ' + levelCtrl.getCurrentLevel().getNumber() + '!';
      }
    } else if (currentLevel.isPlayed()) {
      message = 'LOOSE!';
    } else {
      message = 'WELCOME BACK!';
    }
    fontCtrl.addText(130, 20, message, FONT_STYLE, function(text) {
      text.fixedToCamera = true;
    });
    addLevels();
  }

  let addLevels = function() {
    let i = 0;
    const currentLevel = levelCtrl.getCurrentLevel();
    const levelCount = levelCtrl.getLevelCount();
    while (i < levelCount) {
      const circle = {
        x: 70 + (i % 2 == 0 ? -20 : 20),
        y: 70 + (55 * i),
        width: 50
      }
      const graphics = game.add.graphics(circle.x, circle.y);
      const level = levelCtrl.getLevel(i);
      graphics.lineStyle(1, 0x000000, level.isWonAtAnyTime() ? 1 : 0.5);
      if (highlightLevel(level, currentLevel)) {
        graphics.beginFill(0x73FFA4);
        graphics.drawCircle(0, 0, circle.width + 10);
        swipe.forceSpriteY = circle.y;
        console.info(swipe.forceSpriteY);
        graphics.endFill();
      }
      graphics.beginFill(0xAA3333);
      graphics.drawCircle(0, 0, circle.width);
      graphics.endFill();
      const sprite = game.add.sprite(0, 0);
      sprite.addChild(graphics);

      function addNumberToCircle() {
        let number = i + 1;
        if (number < 100) {
          if (number < 10) {
            number = '0' + number;
          }
          number = '0' + number;
        }
        fontCtrl.addText(circle.x - 13, circle.y - 15, number, FONT_STYLE_LEVEL_CIRCLE);
      }

      function addStarsToCircle() {
        if (level.isWonAtAnyTime()) {
          let score = level.getScoreAllTimeBest();
          game.add.image(circle.x - 21, circle.y - 30, 'star-filled');
          game.add.image(circle.x - 7, circle.y - 36, score > 1 ? 'star-filled' : 'star-outline');
          game.add.image(circle.x + 7, circle.y - 30, score > 2 ? 'star-filled' : 'star-outline');
        }
      }
      addNumberToCircle();
      addStarsToCircle();
      sprite.inputEnabled = true;
      sprite.events.onInputDown.add(startLevel(i), this);
      i++;
    }
    worldHeight = 200 + (55 * i);
    game.world.height = worldHeight;
    game.world.resize();
  }
  let startLevel = function(index) {
    return function() {
      levelCtrl.setCurrentLevelIndex(index);
      position.startSpriteSet = false;
      game.state.start('Game');
    }
  }

  let highlightLevel = function(level, currentLevel) {
    return level.getIndex() == currentLevel.getIndex() && !currentLevel.isWon() ||
      level.getIndex() == currentLevel.getIndex() + 1 && currentLevel.isWon();
  }

  this.update = function() {
    let newpos = false;
    if(!position.startSpriteSet) {
      newpos = swipe.forceSpriteY || Math.max(game.input.y, game.height / 2);
      if (newpos > worldHeight - game.height / 2) newpos = worldHeight - game.height / 2;
      position.sprite.body.position.y = newpos;
      position.startSpriteSet = true;
    }
    if (game.input.activePointer.isDown) {
      if (!swipe.started) {
        swipe.started = true;
        swipe.startInputY = game.input.y;
        swipe.startSpriteY = position.sprite.body.position.y;
      }
      newpos = swipe.startSpriteY + swipe.startInputY - game.input.y;
      if (newpos < game.height / 2) newpos = game.height / 2;
      if (newpos > worldHeight - game.height / 2) newpos = worldHeight - game.height / 2;
      position.sprite.body.position.y = newpos;
      // game.camera.focusOn(position.sprite);
    };
    if (game.input.activePointer.isUp) {
      if(swipe.started) {
      swipe = {};
      }
    };
  }
}
