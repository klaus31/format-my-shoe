let Startscreen = function() {

  let pointsToShow = 0;

  this.preload = function() {
    game.load.image('start-button', 'assets/button_start.png', 92, 40);
  }

  this.create = function() {
    game.add.button(GameProperties.width / 2 - 92 / 2, GameProperties.height / 2 - 40 / 2, 'start-button', startgame);
  }

  let startgame = function() {
    game.state.start('Game');
  }

  this.update = function() {}
}