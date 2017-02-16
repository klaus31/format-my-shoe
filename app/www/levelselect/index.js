let Resultscreen = function() {

  let won = null;
  const FONT_STYLE = {
    fontSize: '20px',
    fill: '#FA5AE2',
    font: 'Courier'
  };

  this.preload = function() {
    game.stage.backgroundColor = '#FFF';
    game.load.image('play-again-button', 'levelselect/button_play-again.png', 162, 40);
    game.load.image('play-next-button', 'levelselect/button_play-next.png', 126, 40);
  }

  this.setWon = function(value) {
    won = value;
  }

  this.create = function() {
    if (won) {
      if (levelCtrl.isCurrentLevelLastLevel()) {
        game.add.text(16, 20, 'You finished', FONT_STYLE);
        game.add.text(16, 50, 'this game!', FONT_STYLE);
      } else {
        game.add.text(16, 16, 'Finished Level ' + levelCtrl.getCurrentLevel().getNumber() + '!', FONT_STYLE);
        addLevels();
      }
    } else if (won === null) {
      game.add.text(16, 16, 'Welcome back!', FONT_STYLE);
      addLevels();
    } else {
      game.add.text(16, 16, 'LOOSE!', FONT_STYLE);
      addLevels();
    }
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