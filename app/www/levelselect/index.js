let Resultscreen = function() {

  let won = null;
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

  this.preload = function() {
    game.stage.backgroundColor = '#FFF';
    game.load.image('play-again-button', 'levelselect/button_play-again.png', 162, 40);
    game.load.image('play-next-button', 'levelselect/button_play-next.png', 126, 40);
  }

  this.setWon = function(value) {
    won = value;
  }

  this.create = function() {
    let message;
    if (won) {
      if (levelCtrl.isCurrentLevelLastLevel()) {
        message = 'FINISHED GAME!';
      } else {
        message = 'FINISHED LEVEL ' + levelCtrl.getCurrentLevel().getNumber() + '!';
      }
    } else if (won === null) {
      message = 'WELCOME BACK!';
    } else {
      message = 'LOOSE!';
    }
    const text = game.add.text(0, 0, message, FONT_STYLE);
    text.setShadow(1, 1, 'rgba(0,0,0,0.5)', 2);
    addLevels();
  }

  let addLevels = function() {
    let i = 0;
    const currentLevelIndex = levelCtrl.getCurrentLevel().getIndex();
    const levelCount = levelCtrl.getLevelCount();
    while (i < levelCount) {
      const graphics = game.add.graphics(30 + (55 * i), 80);
      graphics.lineStyle(1, 0x000000, 1);
      const fillColor = currentLevelIndex == i ? 0xFA5AE2 : 0xAA3333;
      graphics.beginFill(fillColor);
      graphics.drawCircle(0, 0, 50);
      graphics.endFill();
      const sprite = game.add.sprite(0, 0);
      sprite.addChild(graphics);
      game.add.text(30 + (55 * i), 80, i + 1, FONT_STYLE_LEVEL_CIRCLE);
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