let Resultscreen = function() {

  const FONT_STYLE = {
    fill: '#73FFA4',
    cssFont: 'normal 20pt Barrio',
    fixedToCamera: true
  };
  const FONT_STYLE_LEVEL_CIRCLE = {
    fontSize: '13pt',
    fill: '#FFFFFF'
  }

  this.preload = function() {
    game.stage.backgroundColor = '#5B1075';
    game.load.image('star-filled', 'levelselect/star-filled.png', 126, 40);
    game.load.image('star-outline', 'levelselect/star-outline.png', 126, 40);
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
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
    text.font = 'Barrio';
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
      if (highlightLevel(level, currentLevel)) {
        graphics.beginFill(0x73FFA4);
        graphics.drawCircle(0, 0, circle.width + 16);
        graphics.endFill();
      }
      graphics.beginFill(0xAA3333);
      graphics.drawCircle(0, 0, circle.width);
      graphics.endFill();
      const sprite = game.add.sprite(0, 0);
      sprite.addChild(graphics);
      function addNumberToCircle() {
        let number = i+1;
        if(number < 100) {
          if(number < 10) {
            number = '0' + number;
          }
          number = '0' + number;
        }
        let text = game.add.text(circle.x-13, circle.y+2, number, FONT_STYLE_LEVEL_CIRCLE);
        text.font = 'Barrio';
      }
      function addStarsToCircle() {
      if (level.isWonAtAnyTime()) {
        let score = level.getScoreAllTimeBest();
        game.add.image(circle.x - 21, circle.y - 15, 'star-filled');
        game.add.image(circle.x - 7, circle.y - 23, score > 1 ? 'star-filled' : 'star-outline');
        game.add.image(circle.x + 7, circle.y - 15, score > 2 ? 'star-filled' : 'star-outline');
      }
      }
      addNumberToCircle();
      addStarsToCircle();
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

  let highlightLevel = function(level, currentLevel) {
    return level.getIndex() == currentLevel.getIndex() && !currentLevel.isWon() ||
    level.getIndex() == currentLevel.getIndex() + 1 && currentLevel.isWon();
  }

  this.update = function() {}
}
