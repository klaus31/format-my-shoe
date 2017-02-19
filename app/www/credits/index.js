let Credits = function() {

// TODO
  const CREDIT_TEXT = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'.repeat(20);
  const FONT_STYLE = {
    fontSize: '10px',
    fill: '#000',
    font: 'Courier'
  };
  const FONT_STYLE_H1 = {
    fontSize: '16px',
    fill: '#000',
    font: 'Courier'
  };

  this.preload = function() {
    game.stage.backgroundColor = '#FFF';
  }

  this.create = function() {
    let y = 10;
    game.add.text(20, y, 'FINISHED GAME!', FONT_STYLE_H1);
    y += 20;
    game.add.text(20, y+=10, 'Credits:', FONT_STYLE);
    let text = CREDIT_TEXT;
    while(text.length > 0) {
      let line = text.slice(0, 80);
      y += 10;
      game.add.text(20, y, line, FONT_STYLE);
      text = text.substr(80);
    }
  }

  let startgame = function() {
    game.state.start('Resultscreen');
  }

  this.update = function() {}
}
