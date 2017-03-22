let Resultscreen = function() {
  const position = {};
  let swipe = {};
  let worldHeight;
  let headline;
  const FONT_STYLE = {
    fill: hex(Style.colors.primary.c),
    fontSize: '26pt',
    boundsAlignH: 'center',
    boundsAlignV: 'middle'
  };
  const FONT_STYLE_START = {
    fill: hex(Style.colors.primary.c),
    fontSize: '20pt',
    boundsAlignH: 'center',
    boundsAlignV: 'bottom'
  };
  let fontStyleLevelCircle = {
    fontSize: '10pt'
  }
  const fontCtrl = new FontCtrl();
  const WON_MESSAGES = [
    'BRILLIANT',
    'GRANDIOSE',
    'BULLY', 'GORGEOUS',
    'TERRIFIC',
    'INGENIOUS',
    'AWESOME',
    'MAGNIFIC',
    'CRACKING'
  ];
  const FAILED_MESSAGES = [
    'FAILED' // TODO nicely motivating message
  ];

  this.preload = function() {
    position.start = game.world.height / 2;
    game.stage.backgroundColor = Style.colors.primary.e;
    game.load.image('star-filled', 'levelselect/star-filled.png', 126, 40);
    game.load.image('star-outline', 'levelselect/star-outline.png', 126, 40);
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
        message = WON_MESSAGES[Math.floor(Math.random() * WON_MESSAGES.length)] + '!';
      }
    } else if (currentLevel.isPlayed()) {
      if (levelCtrl.isTimeout()) {
        message = 'TIMEOUT!';
      } else {
        message = FAILED_MESSAGES[Math.floor(Math.random() * FAILED_MESSAGES.length)] + '!';
      }
    } else {
      message = 'HURRY UPZZLE!';
    }
    addLevels();
    fontCtrl.addText(0, 0, message, FONT_STYLE, function(text) {
      text.fixedToCamera = true;
      text.stroke = hex(Style.colors.complement.b);
      text.strokeThickness = 13;
      text.setShadow(3, 3, hex(Style.colors.secondary1.b), 2, true, true);
      text.setTextBounds(0, 0, game.width, game.height / 8 * 3);
      text.alpha = 1;
      window.setTimeout(function() {
        headline = text;
      }, 3000);
    });
    levelCtrl.reset();
  }

  let addLevels = function() {
    let i = 0;
    const currentLevel = levelCtrl.getCurrentLevel();
    const levelCount = levelCtrl.getLevelCount();
    const circleWidth = 35;
    const circleMargin = 15;
    const spaceLevelselectWorld = 100;
    let yPosition = levelCount * (circleWidth + circleMargin) + spaceLevelselectWorld;
    let xPosition = game.width / 2;
    while (i < levelCount) {
      yPosition -= circleWidth + circleMargin;
      xPosition += Math.random() >= 0.5 ? -20 : 20;
      if (xPosition < game.width / 2 - 120) xPosition += 40;
      if (xPosition > game.width / 2 + 120) xPosition -= 40;
      const circle = {
        x: xPosition,
        y: yPosition,
        width: circleWidth
      }
      const graphics = game.add.graphics(circle.x, circle.y);
      const level = levelCtrl.getLevel(i);
      graphics.lineStyle(1, level.isWonAtAnyTime() ? Style.colors.complement.c : Style.colors.primary.e, 1);

      let highlightLevel = recommandAsNextToPlay(level);
      if(highlightLevel) swipe.forceSpriteY = circle.y;
      // colors for circle decision
      if (highlightLevel || level.isWonAtAnyTime()) {
        graphics.beginFill(Style.colors.secondary1.b);
      } else {
        graphics.beginFill(Style.colors.primary.d);
      }
      if (level.isWonAtAnyTime()) {
        fontStyleLevelCircle.fill = hex(Style.colors.complement.b);
        fontStyleLevelCircle.fontWeight = 'bold';
      } else {
        fontStyleLevelCircle.fill = hex(Style.colors.primary.e);
        fontStyleLevelCircle.fontWeight = 'normal';
      }
      // draw circle
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
        fontCtrl.addText(circle.x - 10, circle.y - 6, number, fontStyleLevelCircle);
      }

      function addStarsToCircle() {
        if (level.isWonAtAnyTime()) {
          let score = level.getScoreAllTimeBest();
          game.add.image(circle.x - 21, circle.y - 20, 'star-filled');
          game.add.image(circle.x - 7, circle.y - 26, score > 1 ? 'star-filled' : 'star-outline');
          game.add.image(circle.x + 7, circle.y - 20, score > 2 ? 'star-filled' : 'star-outline');
        }
      }
      addNumberToCircle();
      addStarsToCircle();
      // make it clickable
      if (levelCtrl.isPlayable(level)) {
        sprite.inputEnabled = true;
        sprite.events.onInputDown.add(startLevel(i), this);
      } else {
        if (debugMode) {
          sprite.inputEnabled = true;
          sprite.events.onInputDown.add(startLevel(i), this);
        }
      }
      i++;
    }
    worldHeight = (circleWidth + circleMargin) * levelCount + spaceLevelselectWorld;
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

  let recommandAsNextToPlay = function(level) {
    let idx = level.getIndex();
    return !level.isWonAtAnyTime() && (!idx || levelCtrl.getLevel(idx-1).isWonAtAnyTime());
  }

  this.update = function() {
    let newpos = false;
    if (headline) {
      headline.alpha -= 0.01;
      if (headline.alpha < 0.1) {
        headline.destroy();
      }
    }
    if (!position.startSpriteSet) {
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
      if (swipe.started) {
        swipe = {};
      }
    };
  }
}
