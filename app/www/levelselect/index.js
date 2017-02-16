let Resultscreen = function() {

  const FONT_STYLE = {
    fontSize: '20px',
    fill: '#FA5AE2',
    font: 'Courier'
  };
  const FONT_STYLE_LEVEL_CIRCLE = {
    fontSize: '16px',
    fill: '#FFFFFF',
    font: FONT_STYLE.font
  }
  const FONT_STYLE_LEVEL_CIRCLE_CHECK = {
    fontSize: '14px',
    fill: FONT_STYLE_LEVEL_CIRCLE.fill,
    font: FONT_STYLE_LEVEL_CIRCLE.font,
    style: 'bold'
  }

  this.preload = function() {
    game.stage.backgroundColor = '#FFF';
    game.load.image('play-again-button', 'levelselect/button_play-again.png', 162, 40);
    game.load.image('play-next-button', 'levelselect/button_play-next.png', 126, 40);
  }

  this.create = function() {
    let message;
    let currentLevel = levelCtrl.getCurrentLevel();
    if (currentLevel.isWon()) {
      if (levelCtrl.isCurrentLevelLastLevel()) {
        message = 'FINISHED GAME!';
      } else {
        message = 'FINISHED LEVEL ' + levelCtrl.getCurrentLevel().getNumber() + '!';
      }
    } else if (currentLevel.isPlayed()) {
      message = 'LOOSE!';
    } else {
      message = 'WELCOME BACK!';
    }
    const text = game.add.text(0, 0, message, FONT_STYLE);
    text.setShadow(1, 1, 'rgba(0,0,0,0.5)', 2);
    addLevels();
  }

  let addLevels = function() {
    let i = 0;
    const currentLevel = levelCtrl.getCurrentLevel();
    const levelCount = levelCtrl.getLevelCount();
    while (i < levelCount) {
      const graphics = game.add.graphics(30 + (55 * i), 80);
      const level = levelCtrl.getLevel(i);
      graphics.lineStyle(1, 0x000000, level.isWonAtAnyTime() ? 1 : 0.5);
      if (level.getIndex() == currentLevel.getIndex() && !currentLevel.isWon() ||
        level.getIndex() == currentLevel.getIndex() + 1 && currentLevel.isWon() ||
        !currentLevel.isPlayed() && i == 0) {
        graphics.beginFill(0xFA5AE2);
      } else {
        graphics.beginFill(0xAA3333);
      }
      graphics.drawCircle(0, 0, 50);
      graphics.endFill();
      const sprite = game.add.sprite(0, 0);
      sprite.addChild(graphics);
      game.add.text(30 + (55 * i), 80, i + 1, FONT_STYLE_LEVEL_CIRCLE);
      if (level.isWonAtAnyTime()) {
        game.add.text(15 + (55 * i), 70, '✅', FONT_STYLE_LEVEL_CIRCLE_CHECK);
      }
      sprite.inputEnabled = true;
      sprite.events.onInputDown.add(startLevel(i), this);
      i++;
    }
  }
  let startLevel = function(index) {
    return function() {
      levelCtrl.setCurrentLevelIndex(index);
      game.state.start('Game');
    }
  }

  this.update = function() {}
}