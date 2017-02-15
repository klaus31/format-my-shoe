let Resultscreen = function() {

  let won = false;
  const FONT_STYLE = {
    fontSize: '60px',
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
      if (dao.isCurrentLevelLastLevel()) {
        game.add.text(16, 20, 'You finished', FONT_STYLE);
        game.add.text(16, 100, 'this game!', FONT_STYLE);
      } else {
        game.add.text(16, 16, 'Finished Level ' + dao.getCurrentLevelInfo().getNumber() + '!', FONT_STYLE);
        game.add.button(16, 100, 'play-next-button', startNextLevel);
      }
    } else {
      game.add.text(16, 16, 'LOOSE!', FONT_STYLE);
      game.add.button(16,100, 'play-again-button', startSameLevel);
    }
  }

  let startSameLevel = function() {
    game.state.start('Game');
  }

  let startNextLevel = function() {
    dao.incrementCurrentLevel();
    game.state.start('Game');
  }

  this.update = function() {}
}
