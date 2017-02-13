let Resultscreen = function() {

  let won = false;

  this.preload = function() {
    game.load.image('play-again-button', 'assets/button_play-again.png', 162, 40);
    game.load.image('play-next-button', 'assets/button_play-next.png', 126, 40);
  }

  this.setWon = function(value) {
    won = value;
  }

  this.create = function() {
    if(won) {
      if(GameProperties.currentLevel == GameProperties.allLevels) {
        game.add.text(50, 50, 'You finished this game!', GameProperties.style.font.h1);
      } else {
        game.add.text(50, 50, 'Finished Level '+GameProperties.currentLevel+'!', GameProperties.style.font.h1);
        game.add.button(GameProperties.width / 2 - 126 / 2, GameProperties.height / 2 - 40 / 2, 'play-next-button', startNextLevel);
      }
    } else {
      game.add.text(50, 50, 'LOOSE!', GameProperties.style.font.h1);
      game.add.button(GameProperties.width / 2 - 162 / 2, GameProperties.height / 2 - 40 / 2, 'play-again-button', startSameLevel);
    }
  }

  let startSameLevel = function() {
    game.state.start('Game');
  }

  let startNextLevel = function() {
    GameProperties.currentLevel += 1;
    game.state.start('Game');
  }

  this.update = function() {}
}
