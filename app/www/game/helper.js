let Helper = function(level) {
  let helpers = [];
  let helpersOn = false;
  const fontCtrl = new FontCtrl();
  const FONT_STYLE = {
    fill: '#FFF',
    fontSize: '16pt'
  };

  this.preload = function() {
    helpersOn = false;
  }

  this.create = function() {
    fontCtrl.addText(10, game.height - 50, '↺ turn anticlockwise', FONT_STYLE, addHelperText);
    fontCtrl.addText(game.width - 130, game.height - 50, 'turn clockwise ↻', FONT_STYLE, addHelperText);
    fontCtrl.addText(game.width - 80, 10, 'give up 💣', FONT_STYLE, addHelperText);
    fontCtrl.addText(game.width / 2 - 50, game.height / 2 - 20, 'touch to start', FONT_STYLE, addHelperText);
  }

  let addHelperText = function(text) {
    text.fixedToCamera = true;
    helpers.push(text);
    helpersOn = helpers.length == 4;
  }

  this.update = function() {
    if (helpersOn && level.isStarted()) {
      let i = helpers.length;
      while (i--) {
        helpers[i].alpha -= 0.05;
        if (helpers[i].alpha <= 0.1) {
          helpersOn = false;
          helpers[i].destroy();
        }
      }
    }
  }
}
