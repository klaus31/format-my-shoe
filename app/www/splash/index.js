let Startscreen = function() {

  let pointsToShow = 0;
  const FONT_STYLE = {
    fontSize: '20px',
    fill: '#FA5AE2',
    font: 'Courier'
  };

  this.preload = function() {
    game.stage.backgroundColor = '#FFF';
  }

  this.create = function() {
    text = game.add.text(0, 0, "FORMAT MY SHOE", FONT_STYLE);
    text.setShadow(1, 1, 'rgba(0,0,0,0.5)', 2);
    window.setTimeout(startgame, 3000);
  }

  let startgame = function() {
    game.state.start('Resultscreen');
  }

  this.update = function() {}
}