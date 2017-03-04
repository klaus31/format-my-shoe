let Resultscreen = function() {
  const position = {};
  let swipe = {};
  let worldHeight;
  let headline;
  const FONT_STYLE = {
    fill: '#6F00E3',
    fontSize: '26pt',
    boundsAlignH: 'center',
    boundsAlignV: 'middle',
    font: 'Baloo'
  };
  const FONT_STYLE_START = {
    fill: '#6F00E3',
    fontSize: '20pt',
    boundsAlignH: 'center',
    boundsAlignV: 'middle',
    font: 'Baloo'
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
    game.stage.backgroundColor = '#5B1075';
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
      message = FAILED_MESSAGES[Math.floor(Math.random() * FAILED_MESSAGES.length)] + '!';
    } else {
      message = 'WELCOME!';
    }
    addLevels();
    fontCtrl.addText(0, 0, message, FONT_STYLE, function(text) {
      text.fixedToCamera = true;
      text.stroke = "#79F990";
      text.strokeThickness = 13;
      text.setShadow(3, 3, "#333", 2, true, true);
      text.setTextBounds(0, 0, game.width, game.height * 0.8);
      text.alpha = 1;
      window.setTimeout(function() {
        headline = text;
      }, 3000);
    });
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
      graphics.lineStyle(1, 0x000000, level.isWonAtAnyTime() ? 1 : 0.5);

      let highlightLevel = recommandAsNextToPlay(level, currentLevel);
      // mark circle with second circle behind
      if (highlightLevel) {
        graphics.beginFill(level.isWonAtAnyTime() ? 0xF9E379 : 0x73FFA4);
        graphics.drawCircle(1, 1, circle.width + 3);
        swipe.forceSpriteY = circle.y;
        graphics.endFill();
      }
      // colors for circle decision
      if (highlightLevel) {
        if (level.isWonAtAnyTime()) {
          graphics.beginFill(0x3DF962);
          fontStyleLevelCircle.fill = '#000';
          fontStyleLevelCircle.fontWeight = 'bold';
        } else {
          graphics.beginFill(0xF9E379);
          fontStyleLevelCircle.fill = '#000';
          fontStyleLevelCircle.fontWeight = 'normal';
        }
      } else if (level.isWonAtAnyTime()) {
        graphics.beginFill(0x1C802F);
        fontStyleLevelCircle.fill = '#FFF';
        fontStyleLevelCircle.fontWeight = 'bold';
      } else {
        graphics.beginFill(0xF9797F);
        fontStyleLevelCircle.fill = '#000';
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
        fontCtrl.addText(circle.x - 12, circle.y - 7, number, fontStyleLevelCircle);
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
        sprite.alpha = 0.3;
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

  let recommandAsNextToPlay = function(level, currentLevel) {
    return level.getIndex() == currentLevel.getIndex() && !currentLevel.isWon() ||
      level.getIndex() == currentLevel.getIndex() + 1 && currentLevel.isWon();
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