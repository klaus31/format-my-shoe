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
    game.load.image('star-filled', 'levelselect/star-filled.png', 126, 40);
    game.load.image('star-outline', 'levelselect/star-outline.png', 126, 40);
    setGlobalScalingRules();
  }

  this.create = function() {
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
    const text = game.add.text(0, 0, message, FONT_STYLE);
    text.setShadow(1, 1, 'rgba(0,0,0,0.5)', 2);
    addLevels();
  }

  let addLevels = function() {
    let i = 0;
    const currentLevel = levelCtrl.getCurrentLevel();
    const levelCount = levelCtrl.getLevelCount();
    while (i < levelCount) {
      const circle = {
        x: game.scale.width / 2 - 27 + (i % 2 == 0 ? -20 : 20),
        y: game.scale.height - 100 - (55 * i),
        width: 50
      }
      const graphics = game.add.graphics(circle.x, circle.y);
      const level = levelCtrl.getLevel(i);
      graphics.lineStyle(1, 0x000000, level.isWonAtAnyTime() ? 1 : 0.5);
      if (level.getIndex() == currentLevel.getIndex() && !currentLevel.isWon() ||
        level.getIndex() == currentLevel.getIndex() + 1 && currentLevel.isWon()) {
        graphics.beginFill(0xFA5AE2);
      } else {
        graphics.beginFill(0xAA3333);
      }
      graphics.drawCircle(0, 0, circle.width);
      graphics.endFill();
      const sprite = game.add.sprite(0, 0);
      sprite.addChild(graphics);
      game.add.text(circle.x, circle.y, i + 1, FONT_STYLE_LEVEL_CIRCLE);
      if (level.isWonAtAnyTime()) {
        let score = level.getScoreAllTimeBest();
        game.add.image(circle.x - 21, circle.y - 15, 'star-filled');
        game.add.image(circle.x - 7, circle.y - 23, score > 1 ? 'star-filled' : 'star-outline');
        game.add.image(circle.x + 7, circle.y - 15, score > 2 ? 'star-filled' : 'star-outline');
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