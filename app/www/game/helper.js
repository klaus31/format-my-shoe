let Helper = function(level) {
  let helpers = [];
  let helpersOn = false;
  const fontCtrl = new FontCtrl();
  const FONT_STYLE = {
    fill: '#FFF',
    fontSize: '12pt'
  };

  this.preload = function() {
    helpersOn = false;
  }

  this.create = function() {
    fontCtrl.addText(game.width - 80, 10, 'give up 💣', FONT_STYLE, addHelperText);
  }

  let addHelperText = function(text) {
    text.fixedToCamera = true;
    helpers.push(text);
    helpersOn = helpers.length == 4;
  }

  this.update = function() {}
}