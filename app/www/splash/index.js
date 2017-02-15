let Startscreen = function() {

  let pointsToShow = 0;
  const FONT_STYLE = {
    fontSize: '60px',
    fill: '#FA5AE2',
    font: 'Courier'
  };

  this.preload = function() {
    game.stage.backgroundColor = '#FFF';
  }

  this.create = function() {
    text = game.add.text(0, 0, "FORMAT MY SHOE", FONT_STYLE);
    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        text.setTextBounds(50, dimensions.getCenterY() - 100, dimensions.getWidth()-100, 50);
        window.setTimeout(startgame, 3000);
        }

  let startgame = function() {
    game.state.start('Game');
  }

  this.update = function() {}
}
