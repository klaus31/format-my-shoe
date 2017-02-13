let Resultscreen = function() {

  let pointsToShow = 0;
  let won = false;

  this.setPointsToShow = function(value) {
    console.info('pts: ' + value);
    pointsToShow = value;
  }

  this.preload = function() {
    game.load.image('play-again-button', 'assets/button_play-again.png', 162, 40);
  }

  this.setWon = function(value) {
    won = value;
  }

  this.create = function() {
    if(won) {
      game.add.text(50, 50, 'WON! Score: ' + pointsToShow, GameProperties.style.font.h1);
    } else {
      game.add.text(50, 50, 'LOOSE!', GameProperties.style.font.h1);
    }
    game.add.button(GameProperties.width / 2 - 162 / 2, GameProperties.height / 2 - 40 / 2, 'play-again-button', startgame);
  }

  let startgame = function() {
    game.state.start('Game');
  }

  this.update = function() {}
}
